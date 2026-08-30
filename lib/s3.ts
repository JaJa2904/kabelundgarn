import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/** Allowed MIME types for contact form attachments */
export const ALLOWED_CONTENT_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/pdf",
  "image/svg+xml",
] as const;

export type AllowedContentType = (typeof ALLOWED_CONTENT_TYPES)[number];

const CONTENT_TYPE_SET = new Set<string>(ALLOWED_CONTENT_TYPES);

export function isAllowedContentType(value: string): value is AllowedContentType {
  return CONTENT_TYPE_SET.has(value);
}

/** Sanitize filename for safe object key: keep extension, strip path and dangerous chars */
export function sanitizeFilename(filename: string): string {
  const base = filename.replace(/^.*[/\\]/, "").trim() || "file";
  const safe = base.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
  return safe || "file";
}

/** Generate object key: uploads/contact/yyyy-mm/randomId-sanitizedFilename */
export function generateObjectKey(originalFilename: string): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const randomId = crypto.randomUUID().slice(0, 8);
  const sanitized = sanitizeFilename(originalFilename);
  return `uploads/contact/${yyyy}-${mm}/${randomId}-${sanitized}`;
}

function getS3Config() {
  const endpoint = process.env.S3_ENDPOINT;
  const region = process.env.S3_REGION ?? "auto";
  const accessKeyId = process.env.S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
  const bucket = process.env.S3_BUCKET_NAME;

  if (!endpoint || !accessKeyId || !secretAccessKey || !bucket) {
    return null;
  }

  return {
    endpoint,
    region,
    credentials: { accessKeyId, secretAccessKey },
    bucket,
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
  };
}

/** Get S3 client for presigned URL generation (custom endpoint supported) */
export function getS3Client(): S3Client | null {
  const config = getS3Config();
  if (!config) return null;

  return new S3Client({
    endpoint: config.endpoint,
    region: config.region,
    credentials: config.credentials,
    forcePathStyle: config.forcePathStyle,
  });
}

/** Generate a short-lived presigned PUT URL for direct upload (e.g. 60 seconds) */
export async function getPresignedPutUrl(
  key: string,
  contentType: string,
  expiresInSeconds = 60
): Promise<{ uploadUrl: string; bucket: string; key: string } | null> {
  const config = getS3Config();
  const client = getS3Client();
  if (!config || !client) return null;

  const command = new PutObjectCommand({
    Bucket: config.bucket,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(client, command, { expiresIn: expiresInSeconds });
  return { uploadUrl, bucket: config.bucket, key };
}

/** Build public URL for an object if PUBLIC_FILE_BASE_URL is set */
export function getPublicUrl(key: string): string | null {
  const base = process.env.PUBLIC_FILE_BASE_URL;
  if (!base) return null;
  const normalized = base.replace(/\/$/, "");
  return `${normalized}/${key}`;
}
