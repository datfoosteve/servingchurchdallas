-- Add DELETE policy for members table
-- Allows pastor and admin roles to delete members

-- Enable RLS on members table (should already be enabled, but just in case)
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- Allow pastor and admin to delete members
CREATE POLICY "Pastor and Admin can delete members" ON public.members
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.members
      WHERE id = auth.uid() AND role IN ('pastor', 'admin')
    )
  );

COMMENT ON POLICY "Pastor and Admin can delete members" ON public.members IS
  'Allows pastor and admin roles to delete member accounts from the members table';
