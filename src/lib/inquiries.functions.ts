import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { sendInquiryEmails } from "./email.server";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(5).max(4000),
});

export const submitContactInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("contact_inquiries").insert({
      name: data.name,
      email: data.email,
      subject: data.subject || null,
      message: data.message,
    });
    if (error) throw new Error(error.message);
    await sendInquiryEmails({
      kind: "contact",
      to: data.email,
      name: data.name,
      summary: `${data.subject || "New contact inquiry"}\n\n${data.message}`,
    });
    return { ok: true };
  });

const partnerSchema = z.object({
  company: z.string().trim().min(1).max(200),
  contact_name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().default(""),
  interest_type: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().min(5).max(4000),
});

export const submitPartnerInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => partnerSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("partner_inquiries").insert({
      company: data.company,
      contact_name: data.contact_name,
      email: data.email,
      phone: data.phone || null,
      interest_type: data.interest_type || null,
      message: data.message,
    });
    if (error) throw new Error(error.message);
    await sendInquiryEmails({
      kind: "partner",
      to: data.email,
      name: data.contact_name,
      summary: `Company: ${data.company}\nInterest: ${data.interest_type || "—"}\n\n${data.message}`,
    });
    return { ok: true };
  });

const spotlightSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().default(""),
  brand_name: z.string().trim().max(200).optional().default(""),
  location: z.string().trim().max(200).optional().default(""),
  instagram: z.string().trim().max(120).optional().default(""),
  portfolio_url: z.string().trim().max(500).optional().default(""),
  concept_statement: z.string().trim().min(50).max(5000),
  lookbook_urls: z.array(z.string().url()).max(15).optional().default([]),
});

export const submitSpotlightApplication = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => spotlightSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("spotlight_applications").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      brand_name: data.brand_name || null,
      location: data.location || null,
      instagram: data.instagram || null,
      portfolio_url: data.portfolio_url || null,
      concept_statement: data.concept_statement,
      lookbook_urls: data.lookbook_urls,
    });
    if (error) throw new Error(error.message);
    await sendInquiryEmails({
      kind: "spotlight",
      to: data.email,
      name: data.name,
      summary: `Brand: ${data.brand_name || "—"}\nLocation: ${data.location || "—"}\nInstagram: ${data.instagram || "—"}\nPortfolio: ${data.portfolio_url || "—"}\n\n${data.concept_statement}`,
    });
    return { ok: true };
  });
