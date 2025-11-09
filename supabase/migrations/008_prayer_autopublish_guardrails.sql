-- Prayer Spam Protection & Community Moderation
-- Implements auto-publish with guardrails, trust scoring, and community reporting

-- Add spam detection and moderation columns to prayers table
ALTER TABLE public.prayers
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'public',        -- 'public' | 'quarantine' | 'hidden'
  ADD COLUMN IF NOT EXISTS ip_hash TEXT,
  ADD COLUMN IF NOT EXISTS user_agent TEXT,
  ADD COLUMN IF NOT EXISTS risk_score INTEGER NOT NULL DEFAULT 0,        -- 0..100
  ADD COLUMN IF NOT EXISTS trust_level INTEGER NOT NULL DEFAULT 0,       -- 0..100 (auto-raises over time)
  ADD COLUMN IF NOT EXISTS reports INTEGER NOT NULL DEFAULT 0;           -- crowd reports

-- Add index for efficient querying of visible prayers
CREATE INDEX IF NOT EXISTS idx_prayers_status_created ON public.prayers(status, created_at DESC);

-- Create prayer reporting table (community moderation)
CREATE TABLE IF NOT EXISTS public.prayer_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prayer_id UUID REFERENCES public.prayers(id) ON DELETE CASCADE,
  ip_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE (prayer_id, ip_hash)
);

-- Enable RLS on prayer_reports
ALTER TABLE public.prayer_reports ENABLE ROW LEVEL SECURITY;

-- Drop existing prayer policies to recreate with new status logic
DROP POLICY IF EXISTS "Anyone can view public prayers" ON public.prayers;
DROP POLICY IF EXISTS "Anyone can insert prayers" ON public.prayers;

-- Public can read only items not hidden (public and quarantine visible, hidden not visible)
CREATE POLICY "read_visible_prayers" ON public.prayers
  FOR SELECT
  USING (status IN ('public', 'quarantine'));

-- Inserts must come via service role (Edge Function will handle validation)
CREATE POLICY "insert_via_service_role" ON public.prayers
  FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

-- Allow updates via service role (for trust/risk scoring updates)
CREATE POLICY "update_via_service_role" ON public.prayers
  FOR UPDATE
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Reports: allow via service role (Edge Function handles validation)
CREATE POLICY "manage_reports_service" ON public.prayer_reports
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Function to auto-hide prayer when it reaches report threshold
CREATE OR REPLACE FUNCTION auto_hide_reported_prayer()
RETURNS TRIGGER AS $$
BEGIN
  -- If prayer reaches 3 or more reports, auto-hide it
  UPDATE public.prayers
  SET status = 'hidden'
  WHERE id = NEW.prayer_id
    AND reports >= 3
    AND status != 'hidden';

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-hide prayers when report threshold is reached
DROP TRIGGER IF EXISTS on_prayer_report_auto_hide ON public.prayer_reports;
CREATE TRIGGER on_prayer_report_auto_hide
  AFTER INSERT ON public.prayer_reports
  FOR EACH ROW
  EXECUTE FUNCTION auto_hide_reported_prayer();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_prayer_reports_prayer_id ON public.prayer_reports(prayer_id);
CREATE INDEX IF NOT EXISTS idx_prayers_ip_hash ON public.prayers(ip_hash);
CREATE INDEX IF NOT EXISTS idx_prayers_created_at ON public.prayers(created_at DESC);

-- Function to increment prayer report count atomically
CREATE OR REPLACE FUNCTION increment_prayer_reports(prayer_id_param UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.prayers
  SET reports = reports + 1
  WHERE id = prayer_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: Edge Functions (submitPrayer and reportPrayer) will handle:
-- - Cloudflare Turnstile verification
-- - Honeypot detection
-- - Rate limiting
-- - Risk score calculation
-- - Trust level calculation
-- - IP hashing with salt
