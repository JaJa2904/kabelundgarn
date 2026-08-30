"use client";

import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import type { Locale } from "@/lib/translations";
import { getTranslations } from "@/lib/getTranslations";
import { submitContact } from "@/app/actions/contact";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const ACCEPT_TYPES = ".png,.jpg,.jpeg,.webp,.pdf,.svg";

/** Accent CTA motion: hover lift + tap scale (matches MotionLinkWithAnimation). */
function MotionSubmitButton({
  children,
  className,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const off = reduceMotion || disabled;
  return (
    <motion.button
      type="submit"
      disabled={disabled}
      className={className}
      whileHover={off ? {} : { y: -3, transition: { duration: 0.3 } }}
      whileTap={off ? {} : { scale: 0.98, transition: { duration: 0.1 } }}
    >
      {children}
    </motion.button>
  );
}

export function ContactForm({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const reduceMotion = useReducedMotion();
  const [state, formAction] = useFormState(submitContact, { success: false, error: false });
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    setUploadError(null);
    setSizeError(false);

    const formData = new FormData(form);
    const file = formData.get("attachment") as File | null;

    if (file && file.size > 0) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setSizeError(true);
        return;
      }
      setUploadStatus("uploading");
      try {
        const presignRes = await fetch("/api/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: file.name,
            contentType: file.type || "application/octet-stream",
          }),
        });
        if (!presignRes.ok) {
          const data = await presignRes.json().catch(() => ({}));
          throw new Error(data.error || "Failed to get upload URL");
        }
        const { uploadUrl, key, publicUrl } = await presignRes.json();

        const putRes = await fetch(uploadUrl, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type || "application/octet-stream" },
        });
        if (!putRes.ok) {
          throw new Error("Upload failed");
        }

        formData.delete("attachment");
        formData.set("attachmentUrl", publicUrl || key);
        setUploadStatus("idle");
      } catch (err) {
        setUploadStatus("error");
        setUploadError(err instanceof Error ? err.message : t.form.attachmentError);
        return;
      }
    } else {
      formData.delete("attachment");
    }

    formAction(formData);
  }

  const fieldClass =
    "mt-1 w-full rounded-lg border-2 border-accent/25 bg-primary px-3 py-2.5 text-textPrimary placeholder:text-textPrimary/45 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary";

  return (
    <div
      id="contact"
      className="rounded-2xl border-2 border-accent/30 bg-section-muted p-6 text-textPrimary md:p-8"
      aria-labelledby="form-title"
    >
      <h2 id="form-title" className="text-xl font-semibold text-accent md:text-2xl">
        {t.form.title}
      </h2>

      {state?.success && (
        <p
          className="mt-4 rounded-lg border border-accent/20 bg-primary p-3 text-textPrimary/90"
          role="status"
        >
          {t.form.success}
        </p>
      )}
      {state?.error && (
        <p className="mt-4 rounded-lg border border-error/40 bg-error/15 p-3 text-textPrimary" role="alert">
          {t.form.error}
        </p>
      )}

      {!state?.success && (
        <form ref={formRef} action={formAction} onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input type="hidden" name="locale" value={locale} />
          <div className="absolute -left-[9999px] top-0" aria-hidden>
            <label htmlFor="website">Website</label>
            <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-textPrimary/90">
              {t.form.name}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={fieldClass}
              placeholder={t.form.namePlaceholder}
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-textPrimary/90">
              {t.form.email} <span className="text-accent">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className={fieldClass}
              placeholder={t.form.emailPlaceholder}
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-textPrimary/90">
              {t.form.message} <span className="text-accent">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className={fieldClass}
              placeholder={t.form.messagePlaceholder}
            />
          </div>

          <div>
            {/* Not a <label htmlFor="attachment"> — avoids opening the picker when clicking the heading */}
            <div
              id="attachment-label"
              className="block text-sm font-medium text-textPrimary/90"
            >
              {t.form.attachmentLabel}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                id="attachment"
                name="attachment"
                accept={ACCEPT_TYPES}
                className="sr-only"
                aria-labelledby="attachment-label"
                aria-describedby={sizeError || uploadError ? "attachment-error" : undefined}
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              />
              <motion.button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center justify-center rounded-xl border-0 bg-accent px-4 py-2 text-sm font-semibold text-white shadow-lg transition-colors transition-shadow duration-300 ease-out hover:text-[#ffffcc] hover:shadow-xl outline-none focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primaryDark"
                whileHover={reduceMotion ? {} : { y: -3, transition: { duration: 0.3 } }}
                whileTap={reduceMotion ? {} : { scale: 0.98, transition: { duration: 0.1 } }}
              >
                {t.form.chooseFile}
              </motion.button>
              <span className="text-sm text-textPrimary/70">
                {fileName ?? t.form.noFileChosen}
              </span>
            </div>
            {(sizeError || uploadError) && (
              <p id="attachment-error" className="mt-1 text-sm text-error" role="alert">
                {sizeError ? t.form.attachmentSizeError : uploadError}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-textPrimary/90">
                {t.form.quantity}
              </label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                className={fieldClass}
                placeholder={t.form.quantityPlaceholder}
              />
            </div>
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-textPrimary/90">
                {t.form.deadline}
              </label>
              <input
                type="text"
                id="deadline"
                name="deadline"
                className={fieldClass}
                placeholder={t.form.deadlinePlaceholder}
              />
            </div>
          </div>
          <MotionSubmitButton
            disabled={uploadStatus === "uploading"}
            className="inline-flex w-full items-center justify-center rounded-xl border-0 bg-accent px-4 py-3 font-semibold text-white shadow-lg transition-colors transition-shadow duration-300 ease-out hover:text-[#ffffcc] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primaryDark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {uploadStatus === "uploading" ? t.form.attachmentUploading : t.form.submit}
          </MotionSubmitButton>
        </form>
      )}
    </div>
  );
}
