"use server";

export type ContactState = { success?: boolean; error?: boolean };

export async function submitContact(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const website = formData.get("website");
  if (website && String(website).length > 0) {
    return { success: true };
  }

  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  const quantity = formData.get("quantity");
  const deadline = formData.get("deadline");
  const locale = formData.get("locale");
  const attachmentUrl = formData.get("attachmentUrl");

  if (!email || !message) {
    return { error: true };
  }

  const payload = {
    name: name ? String(name).trim() : null,
    email: String(email).trim(),
    message: String(message).trim(),
    quantity: quantity ? String(quantity).trim() : null,
    deadline: deadline ? String(deadline).trim() : null,
    locale: locale ? String(locale) : null,
    attachmentUrl: attachmentUrl ? String(attachmentUrl).trim() : null,
    submittedAt: new Date().toISOString(),
  };

  try {
    console.log("[Contact form submission]", JSON.stringify(payload, null, 2));
    // TODO: Send email (e.g. Resend, Nodemailer) or store in DB; include payload.attachmentUrl in body when present
    return { success: true };
  } catch {
    return { error: true };
  }
}
