-- Events Table for managing church events
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  event_time TEXT, -- e.g., "10:30 AM" or "7:00 PM - 9:00 PM"

  -- Event type: one-time or recurring
  is_recurring BOOLEAN DEFAULT FALSE,
  recurrence_pattern TEXT, -- 'weekly-sunday', 'monthly-first-friday', 'monthly-first-saturday', etc.
  recurrence_end_date TIMESTAMP WITH TIME ZONE, -- When to stop generating recurring events

  -- Metadata
  created_by UUID REFERENCES public.members(id) ON DELETE SET NULL,
  is_published BOOLEAN DEFAULT TRUE,
  category TEXT DEFAULT 'service' CHECK (category IN ('service', 'prayer', 'bible-study', 'fellowship', 'special-event', 'other')),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster querying
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_published ON public.events(is_published);
CREATE INDEX IF NOT EXISTS idx_events_recurring ON public.events(is_recurring);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Everyone can view published events
CREATE POLICY "Anyone can view published events" ON public.events
  FOR SELECT
  USING (is_published = TRUE);

-- Pastor/Admin can view all events (including drafts)
CREATE POLICY "Pastor/Admin can view all events" ON public.events
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.members
      WHERE id = auth.uid() AND role IN ('pastor', 'admin')
    )
  );

-- Pastor/Admin can insert events
CREATE POLICY "Pastor/Admin can insert events" ON public.events
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.members
      WHERE id = auth.uid() AND role IN ('pastor', 'admin')
    )
  );

-- Pastor/Admin can update events
CREATE POLICY "Pastor/Admin can update events" ON public.events
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

-- Pastor/Admin can delete events
CREATE POLICY "Pastor/Admin can delete events" ON public.events
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.members
      WHERE id = auth.uid() AND role IN ('pastor', 'admin')
    )
  );

-- Insert default recurring events
INSERT INTO public.events (title, description, location, event_date, event_time, is_recurring, recurrence_pattern, category)
VALUES
  (
    'Sunday Service',
    'Join us every Sunday for worship, prayer, and biblical teaching. Our service is designed to be a welcoming, uplifting experience for all ages.',
    'Sunnyvale High School - Choir Room',
    '2024-01-07 10:30:00-06', -- First Sunday of 2024
    '10:30 AM - 12:00 PM',
    TRUE,
    'weekly-sunday',
    'service'
  ),
  (
    'Fasting Prayer',
    'Join us for a special time of fasting and prayer. This is a powerful time to seek God together as a community and intercede for our church and community.',
    'Sam''s House - Call for details',
    '2024-01-05 19:00:00-06', -- First Friday of 2024
    '7:00 PM',
    TRUE,
    'monthly-first-friday',
    'prayer'
  );
