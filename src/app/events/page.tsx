"use client";

import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar'; // Adjust the import path as necessary
import 'react-calendar/dist/Calendar.css'; // Keep if you need to override default styles
import { format } from 'date-fns';

const EventsPage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Church Events Calendar</h1>
      <div className="bg-white p-4 shadow rounded-lg">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate} // Use onSelect as per the ShadCN UI library documentation
          className="rounded-md border"
        />
      </div>
      {date && <p className="mt-4 text-lg">
        Selected Date: {format(date, 'MMMM d, yyyy')}
      </p>}
    </div>
  );
};

export default EventsPage;
