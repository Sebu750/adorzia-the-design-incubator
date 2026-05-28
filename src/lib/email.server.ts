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
    applicant: "Adorzia Spotlight Fall 2026 // Application Received & Submission Kit",
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

// Branded email template with Adorzia's visual identity
function brandedTemplate(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
  </style>
</head>
<body style="margin:0;padding:0;background-color:#faf9f7;font-family:'Inter',Arial,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#faf9f7">
    <tr>
      <td align="center" style="padding:40px 20px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#ffffff;border:1px solid #e8e6e3">
          <!-- Header with gold accent -->
          <tr>
            <td style="padding:48px 40px 32px;border-bottom:2px solid #c9a961">
              <h1 style="margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-size:32px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:#1a1a1a;text-align:center">
                Adorzia
              </h1>
              <p style="margin:8px 0 0;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#8b8680;text-align:center">
                Fashion Incubation Studio
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding:40px">
              ${content}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding:32px 40px;border-top:1px solid #e8e6e3;background-color:#faf9f7">
              <p style="margin:0 0 16px;font-size:12px;line-height:1.6;color:#8b8680;text-align:center">
                Where emerging designers become the houses of tomorrow.
              </p>
              <p style="margin:0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8b8680;text-align:center">
                adorzia.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Content block for headings
function headingBlock(text: string) {
  return `<h2 style="margin:0 0 24px;font-family:'Cormorant Garamond',Georgia,serif;font-size:26px;font-weight:400;line-height:1.3;color:#1a1a1a">${text}</h2>`;
}

// Content block for body text
function textBlock(text: string, color = "#3a3a3a") {
  return `<p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:${color}">${text}</p>`;
}

// Content block for highlighted quote
function quoteBlock(text: string) {
  return `<blockquote style="margin:24px 0;padding:20px 24px;border-left:3px solid #c9a961;background-color:#faf9f7;font-style:italic;font-size:14px;line-height:1.6;color:#555">${text}</blockquote>`;
}

// Divider
function divider() {
  return `<hr style="margin:32px 0;border:none;border-top:1px solid #e8e6e3">`;
}

// Data table for admin notifications
function dataTable(data: Array<{ label: string; value: string }>) {
  const rows = data
    .map(
      (item) => `
    <tr>
      <td style="padding:12px 16px 12px 0;font-size:13px;font-weight:500;color:#8b8680;vertical-align:top;width:140px">${item.label}</td>
      <td style="padding:12px 0;font-size:14px;color:#1a1a1a;vertical-align:top">${item.value}</td>
    </tr>`,
    )
    .join("\n");
  
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0">${rows}</table>`;
}

// CTA button
function ctaButton(text: string, url: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:32px 0">
    <tr>
      <td style="border-radius:4px;background-color:#1a1a1a">
        <a href="${url}" style="display:inline-block;padding:14px 32px;font-size:13px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:#ffffff;text-decoration:none">${text}</a>
      </td>
    </tr>
  </table>`;
}

// Spotlight applicant email template with full submission details
function spotlightApplicantTemplate(name: string) {
  const content = `
    ${headingBlock("Adorzia Spotlight Fall 2026")}
    ${textBlock(`Dear ${name},`)}
    ${textBlock("Thank you for initiating your application for the inaugural Adorzia Spotlight Fall 2026 initiative. We have successfully received your initial registration details.")}
    ${textBlock("As an execution-focused fashion house and marketplace, Adorzia is built to eliminate traditional industry friction by absorbing the operational burdens of sourcing, industrial manufacturing, and retail logistics. You have taken the first definitive step toward converting your creative vision into a live commercial reality.")}
    ${divider()}
    <h3 style="margin:0 0 16px;font-size:18px;font-weight:500;color:#1a1a1a">Your Portfolio Submission Requirements</h3>
    ${textBlock("To complete your application and enter our strict, merit-based selection pool, you must compile your collection designs into a single, comprehensive document.")}
    ${textBlock("Attached to this email, you will find your official <strong>Adorzia Spotlight Designer Submission Kit</strong>, which includes the exact 10-page structural blueprint template. Your final submission must follow this structure perfectly and cover:")}
    
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0">
      <tr>
        <td style="padding:12px 0;border-top:1px solid #e8e6e3">
          <strong style="color:#c9a961">01 /</strong> <strong>Identity & Vision:</strong> Your professional brand profile alongside a targeted, 300–500 word design manifesto explaining your take on "Luxury Fusion".
        </td>
      </tr>
      <tr>
        <td style="padding:12px 0;border-top:1px solid #e8e6e3">
          <strong style="color:#c9a961">02 /</strong> <strong>Concept Moodboard:</strong> Your visual aesthetic anchors, research references, and a defined 6-tone color palette (3 primary shades and 3 luxury accents).
        </td>
      </tr>
      <tr>
        <td style="padding:12px 0;border-top:1px solid #e8e6e3">
          <strong style="color:#c9a961">03 /</strong> <strong>The Mini Collection:</strong> Detailed sketches, design breakdowns, and specific "Fusion Point" analysis for exactly 5 cohesive looks.
        </td>
      </tr>
      <tr>
        <td style="padding:12px 0;border-top:1px solid #e8e6e3">
          <strong style="color:#c9a961">04 /</strong> <strong>Technical Specifications:</strong> Factory-ready assembly parameters, exact measurements (standard base size Medium), and fabric compositions for your chosen "Hero Garment" to prove industrial feasibility.
        </td>
      </tr>
      <tr>
        <td style="padding:12px 0;border-top:1px solid #e8e6e3">
          <strong style="color:#c9a961">05 /</strong> <strong>Designer Declaration:</strong> A signed and dated copy of the official legal release page confirming the complete originality of your work.
        </td>
      </tr>
    </table>
    
    ${divider()}
    <h3 style="margin:0 0 16px;font-size:18px;font-weight:500;color:#1a1a1a">How to Submit (Official Submission Protocol)</h3>
    ${textBlock("To ensure your portfolio reaches the jury panel securely, please adhere strictly to the following delivery rules:")}
    
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0">
      <tr>
        <td style="padding:10px 0">
          <strong>File Format:</strong> Your entire portfolio must be compiled, flattened, and saved as a single PDF file. Separate image files or incomplete multi-part documents will not be reviewed.
        </td>
      </tr>
      <tr>
        <td style="padding:10px 0">
          <strong>Submission Channel:</strong> Send your completed PDF file via email directly and exclusively to our official submission inbox: <a href="mailto:applications@adorzia.com" style="color:#c9a961">applications@adorzia.com</a>. Alternatively, you may upload the identical PDF file through your secure designer portal dashboard.
        </td>
      </tr>
      <tr>
        <td style="padding:10px 0">
          <strong>Hard Deadline:</strong> All final PDF submissions must hit our inbox by <strong>June 30, 2026, at 11:59 PM PKT</strong>. Late files or incomplete specification fields will result in automatic disqualification from the grading pool.
        </td>
      </tr>
    </table>
    
    ${divider()}
    <h3 style="margin:0 0 16px;font-size:18px;font-weight:500;color:#1a1a1a">Critical Timeline Nodes</h3>
    
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0">
      <tr>
        <td style="padding:10px 0;border-top:1px solid #e8e6e3">
          <strong>Jury Evaluation Phase:</strong> July 1 – July 9, 2026
        </td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-top:1px solid #e8e6e3">
          <strong>Top 10 Finalists Announced:</strong> July 10, 2026
        </td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-top:1px solid #e8e6e3">
          <strong>The Grand Runway Event:</strong> September 14, 2026 (Live in Lahore, followed by an immediate commercial marketplace launch)
        </td>
      </tr>
    </table>
    
    ${divider()}
    ${textBlock("Please review the attached prospectus guidelines carefully as you refine your blueprints. If you have any technical questions regarding pattern layouts or file formatting, our curatorial team is available to assist you at <a href='mailto:applications@adorzia.com' style='color:#c9a961'>applications@adorzia.com</a>.")}
    ${textBlock("We look forward to reviewing your technical grit and seeing how your work shapes the future of modern luxury fashion.")}
    ${divider()}
    ${textBlock("Best regards,<br><strong>The Adorzia Spotlight Committee</strong><br>Adorzia Corporation", "#555")}
    ${textBlock('<a href="mailto:applications@adorzia.com" style="color:#c9a961">applications@adorzia.com</a> | <a href="https://www.adorzia.com/spotlight" style="color:#c9a961">www.adorzia.com/spotlight</a>', "#8b8680")}
  `;
  return brandedTemplate(content);
}

// Applicant email template
function applicantTemplate(kind: InquiryKind, name: string) {
  if (kind === "spotlight") {
    return spotlightApplicantTemplate(name);
  }
  
  const content = `
    ${headingBlock(`Thank you, ${name}.`)}
    ${textBlock(APPLICANT_BODY[kind])}
    ${divider()}
    ${textBlock(
      "If you have any questions in the meantime, feel free to reply to this email. We're here to help you every step of the way.",
      "#666666",
    )}
    ${quoteBlock("Adorzia exists to remove the barriers between vision and venture.")}
  `;
  return brandedTemplate(content);
}

// Admin notification template
function adminTemplate(kind: InquiryKind, name: string, email: string, summary: string) {
  const kindLabels: Record<InquiryKind, string> = {
    contact: "Contact Inquiry",
    partner: "Partnership Inquiry",
    spotlight: "Spotlight Application",
  };

  const content = `
    ${headingBlock(`New ${kindLabels[kind]}`)}
    ${textBlock("You've received a new submission through the Adorzia website.")}
    ${divider()}
    ${dataTable([
      { label: "Type", value: kindLabels[kind] },
      { label: "Name", value: name },
      { label: "Email", value: email },
      { label: "Received", value: new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }) },
    ])}
    ${divider()}
    <h3 style="margin:0 0 16px;font-size:14px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:#8b8680">Submission Details</h3>
    <div style="padding:20px;background-color:#faf9f7;border:1px solid #e8e6e3;border-radius:4px;white-space:pre-wrap;font-size:14px;line-height:1.6;color:#3a3a3a">${summary}</div>
    ${divider()}
    ${ctaButton("View in Dashboard", `${process.env.SUPABASE_URL || ""}/admin`)}
  `;
  return brandedTemplate(content);
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
  
  console.log("[email] Sending email to:", payload.to, "Subject:", payload.subject);
  
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(payload),
  });
  
  if (!res.ok) {
    const errorText = await res.text();
    console.error("[email] Resend error", res.status, errorText);
    throw new Error(`Failed to send email: ${res.status} ${errorText}`);
  } else {
    const responseData = await res.json();
    console.log("[email] Email sent successfully:", responseData);
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

  console.log(`[email] Sending ${opts.kind} emails...`);
  console.log(`[email] Applicant: ${opts.to} (${opts.name})`);
  console.log(`[email] Admin: ${admin || "not configured"}`);

  // Applicant confirmation
  try {
    await resendSend({
      from,
      to: [opts.to],
      subject: subjects.applicant,
      html: applicantTemplate(opts.kind, opts.name),
    });
    console.log(`[email] Successfully sent applicant email to ${opts.to}`);
  } catch (error) {
    console.error(`[email] Failed to send applicant email to ${opts.to}:`, error);
  }

  // Admin notification
  if (admin) {
    try {
      await resendSend({
        from,
        to: [admin],
        subject: subjects.admin,
        reply_to: opts.to,
        html: adminTemplate(opts.kind, opts.name, opts.to, opts.summary),
      });
      console.log(`[email] Successfully sent admin notification to ${admin}`);
    } catch (error) {
      console.error(`[email] Failed to send admin notification:`, error);
    }
  }
}

// Send Spotlight status change notification
export async function sendSpotlightStatusEmail(opts: {
  to: string;
  name: string;
  status: string;
}) {
  const from = process.env.ADORZIA_FROM_EMAIL || "Adorzia <onboarding@resend.dev>";
  
  const statusEmails: Record<string, { subject: string; content: string }> = {
    shortlisted: {
      subject: "Adorzia Spotlight Fall 2026 // Application Status Update — Shortlisted",
      content: `
        ${headingBlock("Congratulations!")}
        ${textBlock(`Dear ${opts.name},`)}
        ${textBlock("We are pleased to inform you that your application for <strong>Adorzia Spotlight Fall 2026</strong> has been reviewed by our multi-disciplinary expert panel, and you have been <strong>shortlisted</strong> as one of the Top 10 finalists.")}
        ${divider()}
        ${textBlock("This is a significant achievement. Your portfolio demonstrated the technical precision, conceptual clarity, and creative vision that our jury panel seeks in emerging talent.")}
        ${textBlock("<strong>What happens next:</strong>")}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0">
          <tr>
            <td style="padding:10px 0;border-top:1px solid #e8e6e3">
              <strong>Incubation Phase Begins:</strong> July 15, 2026
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-top:1px solid #e8e6e3">
              <strong>Production Support:</strong> Adorzia will cover all sample production costs including materials, pattern development, and industrial labor.
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-top:1px solid #e8e6e3">
              <strong>Grand Runway Event:</strong> September 14, 2026 (Live in Lahore)
            </td>
          </tr>
        </table>
        ${divider()}
        ${textBlock("You will receive a detailed onboarding package within 48 hours with your production timeline, mentorship assignments, and technical specifications for your runway collection.")}
        ${textBlock("If you have immediate questions, please contact us at <a href='mailto:applications@adorzia.com' style='color:#c9a961'>applications@adorzia.com</a>.")}
        ${divider()}
        ${textBlock("Congratulations once again on this achievement. We look forward to supporting your journey from concept to commerce.", "#555")}
        ${textBlock("Best regards,<br><strong>The Adorzia Spotlight Committee</strong><br>Adorzia Corporation", "#555")}
        ${textBlock('<a href="mailto:applications@adorzia.com" style="color:#c9a961">applications@adorzia.com</a> | <a href="https://www.adorzia.com/spotlight" style="color:#c9a961">www.adorzia.com/spotlight</a>', "#8b8680")}
      `,
    },
    winner: {
      subject: "Adorzia Spotlight Fall 2026 // YOU ARE A WINNER!",
      content: `
        ${headingBlock("You Won!")}
        ${textBlock(`Dear ${opts.name},`)}
        ${textBlock("We are thrilled to announce that you have been selected as a <strong>WINNER</strong> of Adorzia Spotlight Fall 2026!")}
        ${divider()}
        ${textBlock("Your collection impressed our jury panel with its exceptional creativity, technical execution, and commercial viability. You will now receive:")}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0">
          <tr>
            <td style="padding:10px 0;border-top:1px solid #e8e6e3">
              <strong>PKR 300,000 Cash Grant</strong> (equity-free)
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-top:1px solid #e8e6e3">
              <strong>12 Months Free Studio Access</strong> at Adorzia atelier
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-top:1px solid #e8e6e3">
              <strong>Permanent Marketplace Placement</strong> with dedicated brand profile
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-top:1px solid #e8e6e3">
              <strong>Investor Introductions</strong> to our fashion-focused network
            </td>
          </tr>
        </table>
        ${divider()}
        ${textBlock("Our team will contact you within 24 hours to begin the onboarding process and arrange your grant disbursement.")}
        ${divider()}
        ${textBlock("Congratulations on this well-deserved recognition. Your work represents the future of modern luxury fashion.", "#555")}
        ${textBlock("Best regards,<br><strong>The Adorzia Spotlight Committee</strong><br>Adorzia Corporation", "#555")}
      `,
    },
    rejected: {
      subject: "Adorzia Spotlight Fall 2026 // Application Status Update",
      content: `
        ${headingBlock("Application Update")}
        ${textBlock(`Dear ${opts.name},`)}
        ${textBlock("Thank you for your application to Adorzia Spotlight Fall 2026. We appreciate the time and effort you invested in submitting your portfolio.")}
        ${textBlock("After careful review by our jury panel, we regret to inform you that your application has not been selected to advance to the finalist stage this cycle.")}
        ${divider()}
        ${textBlock("Please understand that this decision reflects the highly competitive nature of this year's pool, not a lack of potential in your work. We received numerous exceptional applications and could only select 10 finalists.")}
        ${textBlock("<strong>We encourage you to:</strong>")}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0">
          <tr>
            <td style="padding:10px 0;border-top:1px solid #e8e6e3">
              Continue refining your craft and building your portfolio
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-top:1px solid #e8e6e3">
              Apply for future Adorzia Spotlight cycles
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-top:1px solid #e8e6e3">
              Explore our marketplace program for emerging designers
            </td>
          </tr>
        </table>
        ${divider()}
        ${textBlock("We wish you continued success in your design journey and hope to see your work evolve.", "#555")}
        ${textBlock("Best regards,<br><strong>The Adorzia Spotlight Committee</strong><br>Adorzia Corporation", "#555")}
      `,
    },
  };
  
  const emailData = statusEmails[opts.status];
  if (!emailData) {
    console.log(`[email] No email template for status: ${opts.status}`);
    return;
  }
  
  console.log(`[email] Sending status change email to ${opts.to} - Status: ${opts.status}`);
  
  try {
    await resendSend({
      from,
      to: [opts.to],
      subject: emailData.subject,
      html: brandedTemplate(emailData.content),
    });
    console.log(`[email] Status email sent successfully to ${opts.to}`);
  } catch (error) {
    console.error(`[email] Failed to send status email to ${opts.to}:`, error);
  }
}
