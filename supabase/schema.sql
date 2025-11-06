-- Prayer Request Management System Database Schema (FIXED)
-- Run this in your Supabase SQL Editor: https://app.supabase.com/project/_/sql

-- Enable UUID extension (Supabase-recommended)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Prayers table
CREATE TABLE IF NOT EXISTS prayers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  request TEXT NOT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'praying', 'answered', 'ongoing', 'archived')),
  prayer_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  archived_at TIMESTAMPTZ
);

-- Prayer responses table (for "I'm praying" clicks)
CREATE TABLE IF NOT EXISTS prayer_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prayer_id UUID NOT NULL REFERENCES prayers(id) ON DELETE CASCADE,
  ip_address TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
  -- Note: UNIQUE constraint on expression moved to index below
);

-- ✅ FIX: Create unique index on expression (prevents same IP praying twice per day)
-- Using date_trunc which is IMMUTABLE (::date cast is not immutable with TIMESTAMPTZ)
CREATE UNIQUE INDEX IF NOT EXISTS unique_prayer_response_per_day
  ON prayer_responses (prayer_id, ip_address, date_trunc('day', created_at));

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_prayers_status ON prayers(status);
CREATE INDEX IF NOT EXISTS idx_prayers_is_public ON prayers(is_public);
CREATE INDEX IF NOT EXISTS idx_prayers_created_at ON prayers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_prayer_responses_prayer_id ON prayer_responses(prayer_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Trigger to call the function
DROP TRIGGER IF EXISTS update_prayers_updated_at ON prayers;
CREATE TRIGGER update_prayers_updated_at
  BEFORE UPDATE ON prayers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE prayers ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_responses ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts on re-run)
DROP POLICY IF EXISTS "Allow anonymous insert prayers" ON prayers;
DROP POLICY IF EXISTS "Allow anonymous read public prayers" ON prayers;
DROP POLICY IF EXISTS "Allow authenticated read all prayers" ON prayers;
DROP POLICY IF EXISTS "Allow authenticated update prayers" ON prayers;
DROP POLICY IF EXISTS "Allow anonymous insert prayer responses" ON prayer_responses;
DROP POLICY IF EXISTS "Allow anonymous read prayer responses" ON prayer_responses;

-- Allow anonymous users to insert prayers (via API)
CREATE POLICY "Allow anonymous insert prayers" ON prayers
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow anonymous users to read public prayers only
CREATE POLICY "Allow anonymous read public prayers" ON prayers
  FOR SELECT TO anon
  USING (is_public = true AND archived_at IS NULL);

-- Allow authenticated users (admins) to read all prayers
CREATE POLICY "Allow authenticated read all prayers" ON prayers
  FOR SELECT TO authenticated
  USING (true);

-- Allow authenticated users (admins) to update prayers
CREATE POLICY "Allow authenticated update prayers" ON prayers
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow anonymous users to insert prayer responses
CREATE POLICY "Allow anonymous insert prayer responses" ON prayer_responses
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow anonymous users to read prayer response counts
CREATE POLICY "Allow anonymous read prayer responses" ON prayer_responses
  FOR SELECT TO anon
  USING (true);

-- Create a view for public prayers with prayer counts (easier querying)
CREATE OR REPLACE VIEW public_prayers_with_counts AS
SELECT
  p.id,
  p.name,
  p.request,
  p.prayer_count,
  p.created_at,
  p.status
FROM prayers p
WHERE p.is_public = true
  AND p.archived_at IS NULL
  AND p.status IN ('new', 'praying', 'ongoing')
ORDER BY p.created_at DESC;

-- Grant access to the view
GRANT SELECT ON public_prayers_with_counts TO anon, authenticated;

-- Function to increment prayer count (called when someone clicks "I'm praying")
CREATE OR REPLACE FUNCTION increment_prayer_count(prayer_uuid UUID)
RETURNS prayers
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  updated_prayer prayers;
BEGIN
  UPDATE prayers
  SET prayer_count = prayer_count + 1
  WHERE id = prayer_uuid
  RETURNING * INTO updated_prayer;

  RETURN updated_prayer;
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION increment_prayer_count TO anon, authenticated;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Prayer Request Management System schema created successfully!';
  RAISE NOTICE '';
  RAISE NOTICE '📊 Tables created: prayers, prayer_responses';
  RAISE NOTICE '🔒 Row Level Security policies enabled';
  RAISE NOTICE '📈 Indexes created for performance';
  RAISE NOTICE '👀 View created: public_prayers_with_counts';
  RAISE NOTICE '🛡️  Unique constraint: One prayer per IP per day';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Add NEXT_PUBLIC_SUPABASE_URL to your .env.local';
  RAISE NOTICE '2. Add NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local';
  RAISE NOTICE '3. Create an admin user in Supabase Authentication';
  RAISE NOTICE '4. Deploy your Next.js app';
  RAISE NOTICE '';
  RAISE NOTICE '🎉 Your prayer system is ready to use!';
END $$;
