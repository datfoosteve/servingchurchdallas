"use client";

import React from "react";

import { getFirstWeekendOfMonth, getAllSundaysOfMonth } from "./dateHelper";

export const generateRecurringEvents = (year: number, month: number) => {
  const events = [];

  // Fasting Prayer (First Friday of the Month)
  const firstWeekend = getFirstWeekendOfMonth(year, month);
  events.push({
    date: firstWeekend,
    title: "Fasting Prayer",
    description: "Join us for Fasting Prayer at Sam's house.",
    location: "Sam's House - Call for details",
  });

  // Sunday Service (Every Sunday)
  const sundays = getAllSundaysOfMonth(year, month);
  sundays.forEach((sunday) => {
    events.push({
      date: sunday,
      title: "Sunday Service",
      description: "Join us every Sunday for worship, prayer, and teaching.",
      location: "Sunnyvale High School - Choir Room - 10:30am - 12PM",
    });
  });

  return events;
};
