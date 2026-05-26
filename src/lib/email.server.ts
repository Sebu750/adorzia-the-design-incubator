// Server-only email helpers. Sends via Resend when configured; otherwise no-ops.
// Configure RESEND_API_KEY (and optionally ADORZIA_FROM_EMAIL / ADORZIA_ADMIN_EMAIL) as secrets.

type InquiryKind = "contact" | "partner" | "spotlight";

const SUBJECTS: Record<InquiryKind, { applicant: string; admin: string }> = {
  contact: {
    applicant: "We've received your message — Adorzia",
    admin: "New contact inquiry — Adorzia",
  },
  partner: {
    applicant: "Thank you for partnering with Adorzia",
    admin: "New partnership inquiry — Adorzia",
  },
  spotlight: {
    applicant: "Your Spotlight application has been received — Adorzia",
    admin: "New Spotlight application — Adorzia",
  },
};

const APPLICANT_BODY: Record<InquiryKind, string> = {
  contact:
    "Thank you for reaching out to Adorzia. We've received your message and a member of our team will be in touch shortly.",
  partner:
    "Thank you for your interest in partnering with Adorzia. Our partnerships team will review your inquiry and respond within 3 business days.",
  spotlight:
    "Thank you for submitting your Spotlight application. Our curation team reviews every submission carefully — you'll hear back from us once the review period concludes.",
};

function htmlEnvelope(title: string, body: string, summary?: string) {
  return `<!doctype html><html><body style="margin:0;background:#ffffff;font-family:Inter,Arial,sans-serif;color:#1a1a1a">
  <div style="max-width:560px;margin:0 auto;padding:48px 32px">
    <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:28px;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:32px">Adorzia</div>
    <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-weight:400;font-size:28px;line-height:1.2;margin:0 0 24px">${title}</h1>
    <p style="font-size:15px;line-height:1.7;color:#3a3a3a;margin:0 0 16px">${body}</p>
    ${summary ? `<div style="margin-top:32px;padding-top:24px;border-top:1px solid #e6e6e6;white-space:pre-wrap;font-size:14px;color:#555">${summary}</div>` : ""}
    <div style="margin-top:48px;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#888">Adorzia · Fashion Incubation Studio</div>
  </div></body></html>`;
}

async function resendSend(payload: {
  from: string;
  to: string[];
  subject: string;
  html: string;
  reply_to?: string;
}): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[email] RESEND_API_KEY not configured; skipping send", payload.subject);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    console.error("[email] Resend error", res.status, await res.text());
  }
}

export async function sendInquiryEmails(opts: {
  kind: InquiryKind;
  to: string;
  name: string;
  summary: string;
}) {
  const from = process.env.ADORZIA_FROM_EMAIL || "Adorzia <onboarding@resend.dev>";
  const admin = process.env.ADORZIA_ADMIN_EMAIL;
  const subjects = SUBJECTS[opts.kind];

  // Applicant confirmation
  await resendSend({
    from,
    to: [opts.to],
    subject: subjects.applicant,
    html: htmlEnvelope(`Thank you, ${opts.name}.`, APPLICANT_BODY[opts.kind]),
  });

  // Admin notification
  if (admin) {
    await resendSend({
      from,
      to: [admin],
      subject: subjects.admin,
      reply_to: opts.to,
      html: htmlEnvelope(
        subjects.admin,
        `Received from <strong>${opts.name}</strong> (${opts.to}).`,
        opts.summary,
      ),
    });
  }
}
