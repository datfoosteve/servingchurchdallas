"use client";

import React from "react";

import { getFirstWeekendOfMonth, getAllThursdaysOfMonth, getAllSundaysOfMonth } from "./dateHelper";

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

  // Bible Study (Every Thursday)
  const thursdays = getAllThursdaysOfMonth(year, month);
  thursdays.forEach((thursday) => {
    events.push({
      date: thursday,
      title: "Bible Study",
      description: "Deepen your faith with our Bible study session.",
      location: "Sam's House - 5PM to 8PM",
    });
  });

  // Sunday Service (Every Sunday)
  const sundays = getAllSundaysOfMonth(year, month);
  sundays.forEach((sunday) => {
    events.push({
      date: sunday,
      title: "Sunday Service",
      description: "Join us every Sunday for worship, prayer, and teaching.",
      location: "SUnnyvale High School - Choir Room - 10:30am - 12PM",
    });
  });

  return events;
};
