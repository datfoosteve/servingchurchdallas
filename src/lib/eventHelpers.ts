import { addDays, startOfMonth, endOfMonth, getDay, addWeeks, addMonths, startOfDay } from "date-fns";

export interface Event {
  id?: string;
  title: string;
  description: string;
  location: string;
  date: Date;
  time?: string;
  category?: string;
  is_recurring?: boolean;
  recurrence_pattern?: string;
}

/**
 * Generate instances of recurring events for a given month
 */
export function generateRecurringInstances(
  event: Event,
  year: number,
  month: number
): Event[] {
  if (!event.is_recurring || !event.recurrence_pattern) {
    // For one-time events, only include if it's in the target month
    const eventMonth = event.date.getMonth();
    const eventYear = event.date.getFullYear();
    if (eventYear === year && eventMonth === month) {
      return [event];
    }
    return [];
  }

  const instances: Event[] = [];
  const monthStart = startOfMonth(new Date(year, month));
  const monthEnd = endOfMonth(new Date(year, month));

  const pattern = event.recurrence_pattern;

  // Weekly patterns (e.g., "weekly-sunday")
  if (pattern.startsWith("weekly-")) {
    const dayName = pattern.split("-")[1];
    const targetDay = getDayNumber(dayName);

    let currentDate = monthStart;

    // Find first occurrence of the target day in the month
    while (getDay(currentDate) !== targetDay && currentDate <= monthEnd) {
      currentDate = addDays(currentDate, 1);
    }

    // Add all occurrences in the month
    while (currentDate <= monthEnd) {
      instances.push({
        ...event,
        date: new Date(currentDate),
      });
      currentDate = addWeeks(currentDate, 1);
    }
  }

  // Monthly patterns (e.g., "monthly-first-friday")
  if (pattern.startsWith("monthly-")) {
    const parts = pattern.split("-");
    const occurrence = parts[1]; // "first", "second", etc.
    const dayName = parts[2]; // "friday", "sunday", etc.

    if (occurrence === "first") {
      const targetDay = getDayNumber(dayName);
      let currentDate = monthStart;

      // Find first occurrence of the target day in the month
      while (getDay(currentDate) !== targetDay && currentDate <= monthEnd) {
        currentDate = addDays(currentDate, 1);
      }

      if (currentDate <= monthEnd) {
        instances.push({
          ...event,
          date: new Date(currentDate),
        });
      }
    }
  }

  return instances;
}

/**
 * Convert day name to day number (0 = Sunday, 6 = Saturday)
 */
function getDayNumber(dayName: string): number {
  const days: { [key: string]: number } = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };
  return days[dayName.toLowerCase()] ?? 0;
}

/**
 * Generate all event instances (one-time + recurring) for a given month
 */
export function generateMonthEvents(dbEvents: any[], year: number, month: number): Event[] {
  const allInstances: Event[] = [];

  dbEvents.forEach((dbEvent) => {
    const event: Event = {
      id: dbEvent.id,
      title: dbEvent.title,
      description: dbEvent.description,
      location: dbEvent.location,
      date: new Date(dbEvent.event_date),
      time: dbEvent.event_time,
      category: dbEvent.category,
      is_recurring: dbEvent.is_recurring,
      recurrence_pattern: dbEvent.recurrence_pattern,
    };

    const instances = generateRecurringInstances(event, year, month);
    allInstances.push(...instances);
  });

  return allInstances;
}
