import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const designerSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().trim().min(1).max(80).regex(/^[a-z0-9-]+$/, "lowercase letters, numbers, hyphens"),
  name: z.string().trim().min(1).max(120),
  tagline: z.string().trim().max(200).optional().default(""),
  bio: z.string().trim().max(4000).optional().default(""),
  portrait_url: z.string().trim().max(800).optional().default(""),
  cover_url: z.string().trim().max(800).optional().default(""),
  instagram: z.string().trim().max(120).optional().default(""),
  website: z.string().trim().max(400).optional().default(""),
  location: z.string().trim().max(120).optional().default(""),
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(false),
  display_order: z.number().int().optional().default(0),
});

export const listAdminDesigners = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("designers")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const upsertDesigner = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => designerSchema.parse(input))
  .handler(async ({ context, data }) => {
    const payload = { ...data, updated_at: new Date().toISOString() };
    if (data.id) {
      const { error } = await context.supabase.from("designers").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { id: data.id };
    }
    const { data: row, error } = await context.supabase
      .from("designers")
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: row.id };
  });

export const deleteDesigner = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    const { error } = await context.supabase.from("designers").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const listAdminInquiries = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ kind: z.enum(["contact", "partner", "spotlight"]) }).parse(input),
  )
  .handler(async ({ context, data }) => {
    const table =
      data.kind === "contact"
        ? "contact_inquiries"
        : data.kind === "partner"
          ? "partner_inquiries"
          : "spotlight_applications";
    const { data: rows, error } = await context.supabase
      .from(table)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const updateInquiryStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        kind: z.enum(["contact", "partner", "spotlight"]),
        id: z.string().uuid(),
        resolved: z.boolean().optional(),
        status: z.string().max(40).optional(),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    const table =
      data.kind === "contact"
        ? "contact_inquiries"
        : data.kind === "partner"
          ? "partner_inquiries"
          : "spotlight_applications";
    const patch: { resolved?: boolean; status?: string } = {};
    if (typeof data.resolved === "boolean") patch.resolved = data.resolved;
    if (data.status) patch.status = data.status;
    const { error } = await context.supabase.from(table).update(patch as never).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const updateSiteSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        hero_eyebrow: z.string().max(200).optional(),
        hero_title: z.string().max(400).optional(),
        hero_subtitle: z.string().max(800).optional(),
        spotlight_open: z.boolean().optional(),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    const { error } = await context.supabase
      .from("site_settings")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", 1);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
