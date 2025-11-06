-- Prayer Request Management System Database Schema
-- Run this in your Supabase SQL Editor: https://app.supabase.com/project/_/sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Prayers table
CREATE TABLE IF NOT EXISTS prayers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prayer_id UUID NOT NULL REFERENCES prayers(id) ON DELETE CASCADE,
  ip_address TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  -- Prevent same IP from praying for same request multiple times per day
  UNIQUE(prayer_id, ip_address, created_at::DATE)
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_prayers_status ON prayers(status);
CREATE INDEX IF NOT EXISTS idx_prayers_is_public ON prayers(is_public);
CREATE INDEX IF NOT EXISTS idx_prayers_created_at ON prayers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_prayer_responses_prayer_id ON prayer_responses(prayer_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function
CREATE TRIGGER update_prayers_updated_at
  BEFORE UPDATE ON prayers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE prayers ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_responses ENABLE ROW LEVEL SECURITY;

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
RETURNS prayers AS $$
DECLARE
  updated_prayer prayers;
BEGIN
  UPDATE prayers
  SET prayer_count = prayer_count + 1
  WHERE id = prayer_uuid
  RETURNING * INTO updated_prayer;

  RETURN updated_prayer;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION increment_prayer_count TO anon, authenticated;

-- Insert some sample data (optional - remove in production)
-- INSERT INTO prayers (name, email, request, is_public, status) VALUES
-- ('John Doe', 'john@example.com', 'Please pray for my mother''s health recovery.', true, 'praying'),
-- ('Sarah M.', 'sarah@example.com', 'Job interview next week, need guidance.', true, 'new'),
-- ('Anonymous', NULL, 'Family struggles, need wisdom and peace.', false, 'new');

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Prayer Request Management System schema created successfully!';
  RAISE NOTICE '📊 Tables created: prayers, prayer_responses';
  RAISE NOTICE '🔒 Row Level Security policies enabled';
  RAISE NOTICE '📈 Indexes created for performance';
  RAISE NOTICE '👀 View created: public_prayers_with_counts';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Add NEXT_PUBLIC_SUPABASE_URL to your .env.local';
  RAISE NOTICE '2. Add NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local';
  RAISE NOTICE '3. Deploy your Next.js app';
  RAISE NOTICE '4. Create an admin user in Supabase Authentication';
END $$;
