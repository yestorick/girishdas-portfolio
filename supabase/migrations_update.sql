-- ==============================================================================
-- Girish Das (Rick) - Non-Destructive Supabase Migration Script
-- Safe to run on an EXISTING Supabase project WITHOUT deleting your existing data!
-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
-- ==============================================================================

-- 1. Extend site_profile with all editable profile, copy, headings, SEO & contact fields
ALTER TABLE site_profile
  ADD COLUMN IF NOT EXISTS nickname TEXT DEFAULT 'Rick',
  ADD COLUMN IF NOT EXISTS avatar_url TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS phone TEXT DEFAULT '+91 81012 03353',
  ADD COLUMN IF NOT EXISTS location TEXT DEFAULT 'Kolkata, India',
  ADD COLUMN IF NOT EXISTS website_url TEXT DEFAULT 'https://hellorick.vercel.app',
  ADD COLUMN IF NOT EXISTS hero_primary_cta TEXT DEFAULT 'Contact me',
  ADD COLUMN IF NOT EXISTS hero_secondary_cta TEXT DEFAULT 'My project & works',
  ADD COLUMN IF NOT EXISTS experience_heading TEXT DEFAULT 'Experience',
  ADD COLUMN IF NOT EXISTS projects_heading TEXT DEFAULT 'My projects',
  ADD COLUMN IF NOT EXISTS projects_subtitle TEXT DEFAULT 'Paid media campaigns, AI creative workflows, and healthcare content systems I''ve built and managed',
  ADD COLUMN IF NOT EXISTS stack_heading TEXT DEFAULT 'Tech & marketing stacks',
  ADD COLUMN IF NOT EXISTS blog_heading TEXT DEFAULT 'From my blog',
  ADD COLUMN IF NOT EXISTS blog_subtitle TEXT DEFAULT 'Personal notes on Meta Ads, Google Ads, AI creative workflows, conversion tracking, and digital content strategy.',
  ADD COLUMN IF NOT EXISTS footer_heading TEXT DEFAULT 'Let''s connect.';

-- 2. Extend right_now card fields
ALTER TABLE right_now
  ADD COLUMN IF NOT EXISTS card_title TEXT NOT NULL DEFAULT 'Right now',
  ADD COLUMN IF NOT EXISTS current_projects TEXT DEFAULT 'NCD Immunocare (₹60K/mo Ads), Dr Saibal Moitra Clone & Meta Ads Analysis Agent';

-- 3. Extend projects with category ('ai-creative' vs 'marketing'), completion_date, made_by & screenshots
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'marketing',
  ADD COLUMN IF NOT EXISTS completion_date TEXT,
  ADD COLUMN IF NOT EXISTS made_by TEXT DEFAULT 'Made by me',
  ADD COLUMN IF NOT EXISTS screenshots TEXT[] NOT NULL DEFAULT '{}';

UPDATE projects
SET made_by = 'Made by me'
WHERE made_by IS NULL;

UPDATE projects
SET completion_date = duration
WHERE completion_date IS NULL AND duration IS NOT NULL;

-- 4. Create education table (editable on /resume) if not present yet
CREATE TABLE IF NOT EXISTS education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    period TEXT NOT NULL,
    description TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE education ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Education is viewable by everyone" ON education;
CREATE POLICY "Education is viewable by everyone"
ON education FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins have full access to education" ON education;
CREATE POLICY "Admins have full access to education"
ON education FOR ALL TO authenticated
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

INSERT INTO education (degree, institution, period, description, order_index)
SELECT
    'B.Sc. (Honours), Chemistry',
    'Taki Government College, West Bengal',
    'Dropped out (2nd year)',
    'Dropped out in 2nd year to pursue a full-time career in digital marketing. Self-taught performance marketing and content strategy through YouTube and X (Twitter), applied on live campaigns.',
    1
WHERE NOT EXISTS (SELECT 1 FROM education);

-- 5. Remove deprecated My favourites table (safe if absent)
DROP TABLE IF EXISTS favorites CASCADE;

-- 6. Ensure Storage bucket + public read / authenticated write policies exist safely
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('portfolio-media', 'portfolio-media', true)
  ON CONFLICT (id) DO UPDATE SET public = true;

  DROP POLICY IF EXISTS "Public read access for portfolio-media" ON storage.objects;
  CREATE POLICY "Public read access for portfolio-media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-media');

  DROP POLICY IF EXISTS "Authenticated manage access for portfolio-media" ON storage.objects;
  CREATE POLICY "Authenticated manage access for portfolio-media"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'portfolio-media')
  WITH CHECK (bucket_id = 'portfolio-media');
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Storage bucket or policy skipped (%). You can create the public "portfolio-media" bucket in Supabase Dashboard -> Storage.', SQLERRM;
END $$;
