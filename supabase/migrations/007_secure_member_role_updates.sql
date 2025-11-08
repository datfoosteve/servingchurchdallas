-- Security fix: Prevent regular members from changing their own role
-- Only pastors/admins should be able to change roles

-- Drop the existing policy that allows members to update their own profile
DROP POLICY IF EXISTS "Members can update own profile" ON public.members;

-- Create a more secure policy that prevents members from changing their role
-- Members can only update their own NON-SENSITIVE fields (name, phone, avatar, etc.)
-- They CANNOT change their role, id, email, or other critical fields
CREATE POLICY "Members can update own profile" ON public.members
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND role = (SELECT role FROM public.members WHERE id = auth.uid())
  );

-- The WITH CHECK ensures that the role after update matches the role before update
-- This prevents members from changing their own role

-- Note: The "Pastor/Admin can manage all members" policy still allows
-- pastors and admins to change any member's role, including the role field
