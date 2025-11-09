-- Admin & Pastor Prayer Management Permissions
-- Allows admins and pastors to:
-- - Update prayer status (new, praying, answered, ongoing, archived, public, quarantine, hidden)
-- - Delete prayers (spam, inappropriate, duplicates)
-- - View all prayers including hidden ones

-- Drop existing service-role-only UPDATE policy
DROP POLICY IF EXISTS "update_via_service_role" ON public.prayers;

-- Allow service role to update (for Edge Functions)
CREATE POLICY "update_via_service_role" ON public.prayers
  FOR UPDATE
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Allow admin/pastor to update prayers (change status, mark answered, etc.)
CREATE POLICY "admin_pastor_update_prayers" ON public.prayers
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

-- Allow admin/pastor to delete prayers
CREATE POLICY "admin_pastor_delete_prayers" ON public.prayers
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.members
      WHERE id = auth.uid() AND role IN ('pastor', 'admin')
    )
  );

-- Allow admin/pastor to view ALL prayers (including hidden ones) for moderation
DROP POLICY IF EXISTS "read_visible_prayers" ON public.prayers;

-- Public can read only public and quarantine prayers (not hidden)
CREATE POLICY "public_read_visible_prayers" ON public.prayers
  FOR SELECT
  USING (
    status IN ('public', 'quarantine', 'answered')
    AND (auth.role() = 'anon' OR auth.role() = 'authenticated')
  );

-- Admin/Pastor can read ALL prayers including hidden ones
CREATE POLICY "admin_pastor_read_all_prayers" ON public.prayers
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.members
      WHERE id = auth.uid() AND role IN ('pastor', 'admin')
    )
  );

-- Comment explaining the policy structure
COMMENT ON POLICY "admin_pastor_delete_prayers" ON public.prayers IS
  'Allows pastor and admin roles to delete prayers (spam, inappropriate content, duplicates)';

COMMENT ON POLICY "admin_pastor_update_prayers" ON public.prayers IS
  'Allows pastor and admin roles to update prayer status and moderate content';

COMMENT ON POLICY "admin_pastor_read_all_prayers" ON public.prayers IS
  'Allows pastor and admin roles to view all prayers including hidden ones for moderation';
