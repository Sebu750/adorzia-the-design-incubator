
-- Designers
CREATE TABLE public.designers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  tagline TEXT,
  bio TEXT,
  portrait_url TEXT,
  cover_url TEXT,
  instagram TEXT,
  website TEXT,
  location TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT false,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.designers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.designers TO authenticated;
GRANT ALL ON public.designers TO service_role;
ALTER TABLE public.designers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published designers" ON public.designers FOR SELECT TO anon USING (published = true);
CREATE POLICY "Authenticated reads all designers" ON public.designers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated inserts designers" ON public.designers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated updates designers" ON public.designers FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated deletes designers" ON public.designers FOR DELETE TO authenticated USING (true);

-- Collections
CREATE TABLE public.collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  designer_id UUID NOT NULL REFERENCES public.designers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  year INT,
  description TEXT,
  cover_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.collections TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.collections TO authenticated;
GRANT ALL ON public.collections TO service_role;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads collections of published designers" ON public.collections FOR SELECT TO anon
  USING (EXISTS (SELECT 1 FROM public.designers d WHERE d.id = designer_id AND d.published = true));
CREATE POLICY "Authenticated full collections" ON public.collections FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Products
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID NOT NULL REFERENCES public.collections(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price_display TEXT,
  images TEXT[] NOT NULL DEFAULT '{}',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads products of published designers" ON public.products FOR SELECT TO anon
  USING (EXISTS (
    SELECT 1 FROM public.collections c
    JOIN public.designers d ON d.id = c.designer_id
    WHERE c.id = collection_id AND d.published = true
  ));
CREATE POLICY "Authenticated full products" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Spotlight applications
CREATE TABLE public.spotlight_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  brand_name TEXT,
  location TEXT,
  instagram TEXT,
  portfolio_url TEXT,
  concept_statement TEXT NOT NULL,
  lookbook_urls TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.spotlight_applications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.spotlight_applications TO authenticated;
GRANT ALL ON public.spotlight_applications TO service_role;
ALTER TABLE public.spotlight_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone submits applications" ON public.spotlight_applications FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Authenticated submits applications" ON public.spotlight_applications FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated reads applications" ON public.spotlight_applications FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated updates applications" ON public.spotlight_applications FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated deletes applications" ON public.spotlight_applications FOR DELETE TO authenticated USING (true);

-- Contact inquiries
CREATE TABLE public.contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  resolved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_inquiries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_inquiries TO authenticated;
GRANT ALL ON public.contact_inquiries TO service_role;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone submits contact" ON public.contact_inquiries FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Authenticated submits contact" ON public.contact_inquiries FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated reads contact" ON public.contact_inquiries FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated updates contact" ON public.contact_inquiries FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated deletes contact" ON public.contact_inquiries FOR DELETE TO authenticated USING (true);

-- Partner inquiries
CREATE TABLE public.partner_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  interest_type TEXT,
  message TEXT NOT NULL,
  resolved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.partner_inquiries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_inquiries TO authenticated;
GRANT ALL ON public.partner_inquiries TO service_role;
ALTER TABLE public.partner_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone submits partner" ON public.partner_inquiries FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Authenticated submits partner" ON public.partner_inquiries FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated reads partner" ON public.partner_inquiries FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated updates partner" ON public.partner_inquiries FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated deletes partner" ON public.partner_inquiries FOR DELETE TO authenticated USING (true);

-- Site settings (singleton)
CREATE TABLE public.site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  hero_eyebrow TEXT,
  hero_title TEXT,
  hero_subtitle TEXT,
  spotlight_open BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT singleton CHECK (id = 1)
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads site settings" ON public.site_settings FOR SELECT TO anon USING (true);
CREATE POLICY "Authenticated reads site settings" ON public.site_settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated updates site settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

INSERT INTO public.site_settings (id, hero_eyebrow, hero_title, hero_subtitle)
VALUES (1, 'Fashion incubation & creative entrepreneurship',
        'Where emerging designers become the houses of tomorrow.',
        'Adorzia is a coworking studio, a curated marketplace, and a global Spotlight — built for the next generation of fashion.');

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
  ('designers', 'designers', true),
  ('collections', 'collections', true),
  ('spotlight-lookbooks', 'spotlight-lookbooks', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: public buckets — anyone read; authenticated write
CREATE POLICY "Public read designers bucket" ON storage.objects FOR SELECT TO anon USING (bucket_id = 'designers');
CREATE POLICY "Auth read designers bucket" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'designers');
CREATE POLICY "Auth write designers bucket" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'designers');
CREATE POLICY "Auth update designers bucket" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'designers');
CREATE POLICY "Auth delete designers bucket" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'designers');

CREATE POLICY "Public read collections bucket" ON storage.objects FOR SELECT TO anon USING (bucket_id = 'collections');
CREATE POLICY "Auth read collections bucket" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'collections');
CREATE POLICY "Auth write collections bucket" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'collections');
CREATE POLICY "Auth update collections bucket" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'collections');
CREATE POLICY "Auth delete collections bucket" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'collections');

-- Spotlight lookbooks: public uploads allowed (for applications), only authenticated can read
CREATE POLICY "Public uploads spotlight" ON storage.objects FOR INSERT TO anon WITH CHECK (bucket_id = 'spotlight-lookbooks');
CREATE POLICY "Auth uploads spotlight" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'spotlight-lookbooks');
CREATE POLICY "Auth reads spotlight" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'spotlight-lookbooks');
CREATE POLICY "Auth deletes spotlight" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'spotlight-lookbooks');
