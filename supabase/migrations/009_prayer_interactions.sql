-- Migration: Add prayer interaction tracking
-- Creates prayer_responses table and increment_prayer_count function

-- Drop existing function if it exists (to handle reruns)
DROP FUNCTION IF EXISTS public.increment_prayer_count(UUID);

-- Create immutable function for date extraction
CREATE OR REPLACE FUNCTION public.prayer_date(ts TIMESTAMP WITH TIME ZONE)
RETURNS DATE
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT ts::date;
$$;

-- Create prayer_responses table to track who has prayed
CREATE TABLE IF NOT EXISTS public.prayer_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prayer_id UUID NOT NULL REFERENCES public.prayers(id) ON DELETE CASCADE,
  ip_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_prayer_responses_prayer_id ON public.prayer_responses(prayer_id);
CREATE INDEX IF NOT EXISTS idx_prayer_responses_created_at ON public.prayer_responses(created_at);

-- Create unique index to prevent duplicate prayers per IP per day
-- Using our immutable function for date extraction
CREATE UNIQUE INDEX IF NOT EXISTS idx_prayer_responses_unique_daily
  ON public.prayer_responses(prayer_id, ip_address, prayer_date(created_at));

-- Enable RLS
ALTER TABLE public.prayer_responses ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to handle reruns)
DROP POLICY IF EXISTS "Anyone can record prayer" ON public.prayer_responses;
DROP POLICY IF EXISTS "Anyone can view prayer responses" ON public.prayer_responses;

-- Allow anyone to insert prayer responses (public can pray)
CREATE POLICY "Anyone can record prayer" ON public.prayer_responses
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read prayer responses (for checking if already prayed)
CREATE POLICY "Anyone can view prayer responses" ON public.prayer_responses
  FOR SELECT
  USING (true);

-- Create RPC function to increment prayer count
CREATE FUNCTION public.increment_prayer_count(prayer_uuid UUID)
RETURNS TABLE(prayer_count INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.prayers
  SET prayer_count = prayer_count + 1
  WHERE id = prayer_uuid;

  RETURN QUERY
  SELECT prayers.prayer_count
  FROM public.prayers
  WHERE id = prayer_uuid;
END;
$$;

-- Grant execute permission to anon and authenticated users
GRANT EXECUTE ON FUNCTION public.increment_prayer_count(UUID) TO anon;
GRANT EXECUTE ON FUNCTION public.increment_prayer_count(UUID) TO authenticated;

-- Add comment for documentation
COMMENT ON TABLE public.prayer_responses IS 'Tracks prayer interactions to prevent duplicate prayers and count engagement';
COMMENT ON FUNCTION public.increment_prayer_count IS 'Safely increments the prayer count for a given prayer request';
