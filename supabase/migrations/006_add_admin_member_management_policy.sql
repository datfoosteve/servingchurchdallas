-- Add policy to allow pastors/admins to update any member's profile/role
-- This enables the member management page to work correctly

-- Drop if exists to make migration idempotent
DROP POLICY IF EXISTS "Pastor/Admin can manage all members" ON public.members;

-- Create policy that allows pastors/admins to update any member
CREATE POLICY "Pastor/Admin can manage all members" ON public.members
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.members
      WHERE id = auth.uid() AND role IN ('pastor', 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.members
      WHERE id = auth.uid() AND role IN ('pastor', 'admin')
    )
  );

-- Note: This policy works alongside the "Members can update own profile" policy
-- Both policies will be evaluated, and either can grant access
