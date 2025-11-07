-- Member Portal Schema (CORRECTED VERSION)
-- Run this in your Supabase SQL editor

-- Create members profile table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.members (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_seen_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  role TEXT DEFAULT 'member' CHECK (role IN ('member', 'pastor', 'admin')),
  notification_preferences JSONB DEFAULT '{"email": true, "announcements": true, "events": true}'::jsonb,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on members table
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- Create announcements table
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES public.members(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  is_published BOOLEAN DEFAULT FALSE,
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  category TEXT DEFAULT 'general' CHECK (category IN ('general', 'event', 'prayer', 'update', 'urgent')),
  target_audience TEXT DEFAULT 'all'
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Create announcement_reads table (track who read what)
CREATE TABLE IF NOT EXISTS public.announcement_reads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  announcement_id UUID REFERENCES public.announcements(id) ON DELETE CASCADE,
  member_id UUID REFERENCES public.members(id) ON DELETE CASCADE,
  read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(announcement_id, member_id)
);

ALTER TABLE public.announcement_reads ENABLE ROW LEVEL SECURITY;

-- Create polls table (for future use)
CREATE TABLE IF NOT EXISTS public.polls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  author_id UUID REFERENCES public.members(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  closes_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  allow_multiple_votes BOOLEAN DEFAULT FALSE,
  show_results_before_voting BOOLEAN DEFAULT FALSE
);

ALTER TABLE public.polls ENABLE ROW LEVEL SECURITY;

-- Create poll_options table
CREATE TABLE IF NOT EXISTS public.poll_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id UUID REFERENCES public.polls(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  display_order INTEGER DEFAULT 0
);

ALTER TABLE public.poll_options ENABLE ROW LEVEL SECURITY;

-- Create poll_votes table
CREATE TABLE IF NOT EXISTS public.poll_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id UUID REFERENCES public.polls(id) ON DELETE CASCADE,
  option_id UUID REFERENCES public.poll_options(id) ON DELETE CASCADE,
  member_id UUID REFERENCES public.members(id) ON DELETE CASCADE,
  voted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(poll_id, option_id, member_id)
);

ALTER TABLE public.poll_votes ENABLE ROW LEVEL SECURITY;

-- Row Level Security Policies

-- Members table policies
CREATE POLICY "Members can view all profiles" ON public.members
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Members can update own profile" ON public.members
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- Announcements policies
CREATE POLICY "Anyone can view published announcements" ON public.announcements
  FOR SELECT
  USING (is_published = true AND published_at <= NOW() AND (expires_at IS NULL OR expires_at > NOW()));

CREATE POLICY "Pastor/Admin can manage announcements" ON public.announcements
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.members
      WHERE id = auth.uid() AND role IN ('pastor', 'admin')
    )
  );

-- Announcement reads policies
CREATE POLICY "Members can view own reads" ON public.announcement_reads
  FOR SELECT TO authenticated
  USING (member_id = auth.uid());

CREATE POLICY "Members can mark announcements as read" ON public.announcement_reads
  FOR INSERT TO authenticated
  WITH CHECK (member_id = auth.uid());

-- Polls policies
CREATE POLICY "Everyone can view active polls" ON public.polls
  FOR SELECT
  USING (is_active = true AND (closes_at IS NULL OR closes_at > NOW()));

CREATE POLICY "Pastor/Admin can manage polls" ON public.polls
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.members
      WHERE id = auth.uid() AND role IN ('pastor', 'admin')
    )
  );

-- Poll options policies
CREATE POLICY "Everyone can view poll options" ON public.poll_options
  FOR SELECT
  USING (true);

CREATE POLICY "Pastor/Admin can manage poll options" ON public.poll_options
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.members
      WHERE id = auth.uid() AND role IN ('pastor', 'admin')
    )
  );

-- Poll votes policies
CREATE POLICY "Members can view poll results" ON public.poll_votes
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Members can vote on polls" ON public.poll_votes
  FOR INSERT TO authenticated
  WITH CHECK (member_id = auth.uid());

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_members_role ON public.members(role);
CREATE INDEX IF NOT EXISTS idx_members_email ON public.members(email);
CREATE INDEX IF NOT EXISTS idx_announcements_published ON public.announcements(is_published, published_at);
CREATE INDEX IF NOT EXISTS idx_announcements_author ON public.announcements(author_id);
CREATE INDEX IF NOT EXISTS idx_announcement_reads_member ON public.announcement_reads(member_id);
CREATE INDEX IF NOT EXISTS idx_announcement_reads_announcement ON public.announcement_reads(announcement_id);
CREATE INDEX IF NOT EXISTS idx_polls_active ON public.polls(is_active);
CREATE INDEX IF NOT EXISTS idx_poll_votes_poll ON public.poll_votes(poll_id);
CREATE INDEX IF NOT EXISTS idx_poll_votes_member ON public.poll_votes(member_id);

-- Function to auto-create member profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.members (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create member profile on auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_members_updated_at ON public.members;
CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON public.members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_announcements_updated_at ON public.announcements;
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON public.announcements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
