import { NextResponse } from "next/server";
import {
  isAllowedContentType,
  generateObjectKey,
  getPresignedPutUrl,
  getPublicUrl,
} from "@/lib/s3";

export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const filename = typeof body.filename === "string" ? body.filename.trim() : "";
    const contentType = typeof body.contentType === "string" ? body.contentType.trim() : "";

    if (!filename || !contentType) {
      return NextResponse.json(
        { error: "Missing filename or contentType" },
        { status: 400 }
      );
    }

    if (!isAllowedContentType(contentType)) {
      return NextResponse.json(
        { error: "Invalid content type. Allowed: image/png, image/jpeg, image/webp, application/pdf, image/svg+xml" },
        { status: 400 }
      );
    }

    const key = generateObjectKey(filename);
    const presigned = await getPresignedPutUrl(key, contentType, 60);

    if (!presigned) {
      return NextResponse.json(
        { error: "Upload not configured" },
        { status: 503 }
      );
    }

    const publicUrl = getPublicUrl(key);

    return NextResponse.json({
      uploadUrl: presigned.uploadUrl,
      key: presigned.key,
      publicUrl: publicUrl ?? undefined,
    });
  } catch (e) {
    console.error("[upload-url]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
