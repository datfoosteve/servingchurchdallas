-- Add member linkage and privacy settings to prayers table

-- Add new columns to prayers
ALTER TABLE public.prayers
  ADD COLUMN IF NOT EXISTS member_id UUID REFERENCES public.members(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS show_name BOOLEAN DEFAULT TRUE;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_prayers_member_id ON public.prayers(member_id);

-- Update RLS policies to allow members to see their own private prayers
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Members can view their own prayers" ON public.prayers;

-- Create new policy for members to view their own prayers (both public and private)
CREATE POLICY "Members can view their own prayers" ON public.prayers
  FOR SELECT TO authenticated
  USING (
    member_id = auth.uid()
  );

-- Comment: Existing policies for public prayers and admin access remain unchanged
-- This just adds the ability for members to see their own private prayers

-- Optional: Function to get member name for display
CREATE OR REPLACE FUNCTION public.get_prayer_display_name(
  prayer_member_id UUID,
  prayer_show_name BOOLEAN,
  prayer_name TEXT
) RETURNS TEXT AS $$
BEGIN
  -- If show_name is false, return "Anonymous"
  IF NOT prayer_show_name THEN
    RETURN 'Anonymous';
  END IF;

  -- If member_id exists and show_name is true, get member's full_name
  IF prayer_member_id IS NOT NULL THEN
    RETURN (
      SELECT COALESCE(full_name, email, 'Anonymous')
      FROM public.members
      WHERE id = prayer_member_id
    );
  END IF;

  -- Otherwise use the name field
  RETURN COALESCE(prayer_name, 'Anonymous');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
