import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateICS, parseEventFromAnnouncement } from '@/lib/calendar';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();

    // Fetch the announcement
    const { data: announcement, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error || !announcement) {
      return NextResponse.json(
        { error: 'Announcement not found' },
        { status: 404 }
      );
    }

    // Only generate calendar for event category
    if (announcement.category !== 'event') {
      return NextResponse.json(
        { error: 'Only event announcements can be added to calendar' },
        { status: 400 }
      );
    }

    // Parse event details from announcement
    const calendarEvent = parseEventFromAnnouncement(announcement);

    if (!calendarEvent) {
      return NextResponse.json(
        { error: 'Failed to parse event details' },
        { status: 500 }
      );
    }

    // Generate ICS content
    const icsContent = generateICS(calendarEvent);

    // Return as downloadable .ics file
    return new NextResponse(icsContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar;charset=utf-8',
        'Content-Disposition': `attachment; filename="${announcement.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics"`,
      },
    });
  } catch (error) {
    console.error('Error generating calendar file:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
