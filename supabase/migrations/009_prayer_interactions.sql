-- Migration: Add prayer interaction tracking
-- Creates prayer_responses table and increment_prayer_count function

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
-- Using an expression index with cast operator (immutable)
CREATE UNIQUE INDEX IF NOT EXISTS idx_prayer_responses_unique_daily
  ON public.prayer_responses(prayer_id, ip_address, (created_at::date));

-- Enable RLS
ALTER TABLE public.prayer_responses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert prayer responses (public can pray)
CREATE POLICY "Anyone can record prayer" ON public.prayer_responses
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read prayer responses (for checking if already prayed)
CREATE POLICY "Anyone can view prayer responses" ON public.prayer_responses
  FOR SELECT
  USING (true);

-- Create RPC function to increment prayer count
CREATE OR REPLACE FUNCTION public.increment_prayer_count(prayer_uuid UUID)
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
