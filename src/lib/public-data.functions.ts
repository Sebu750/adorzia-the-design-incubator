import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const getSiteSettings = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await supabaseAdmin
    .from("site_settings")
    .select("hero_eyebrow,hero_title,hero_subtitle,spotlight_open")
    .eq("id", 1)
    .maybeSingle();
  return data ?? null;
});

export const listFeaturedDesigners = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await supabaseAdmin
    .from("designers")
    .select("id,slug,name,tagline,portrait_url,cover_url,location")
    .eq("published", true)
    .eq("featured", true)
    .order("display_order", { ascending: true })
    .limit(8);
  return data ?? [];
});

export const listDesigners = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await supabaseAdmin
    .from("designers")
    .select("id,slug,name,tagline,portrait_url,cover_url,location")
    .eq("published", true)
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });
  return data ?? [];
});

export const getDesignerBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    const { data: designer } = await supabaseAdmin
      .from("designers")
      .select("*")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (!designer) return null;
    const { data: collections } = await supabaseAdmin
      .from("collections")
      .select("id,title,year,description,cover_url")
      .eq("designer_id", designer.id)
      .order("display_order", { ascending: true });
    const collectionIds = (collections ?? []).map((c) => c.id);
    const { data: products } = collectionIds.length
      ? await supabaseAdmin
          .from("products")
          .select("id,collection_id,name,description,price_display,images")
          .in("collection_id", collectionIds)
          .order("display_order", { ascending: true })
      : { data: [] };
    return { designer, collections: collections ?? [], products: products ?? [] };
  });
