"use client";

import React from "react";

import { addDays } from "date-fns";

// Get the first weekend (Friday) of the month
export const getFirstWeekendOfMonth = (year: number, month: number): Date => {
  const firstDay = new Date(year, month, 1);
  const dayOfWeek = firstDay.getDay();
  const firstFriday = new Date(year, month, 1 + ((5 - dayOfWeek + 7) % 7)); // Find first Friday
  return firstFriday;
};

// Get all Thursdays of the month
export const getAllThursdaysOfMonth = (year: number, month: number): Date[] => {
  const thursdays: Date[] = [];
  const firstDay = new Date(year, month, 1);
  const dayOfWeek = firstDay.getDay();
  const firstThursday = new Date(year, month, 1 + ((4 - dayOfWeek + 7) % 7)); // Find first Thursday

  for (let i = 0; i < 5; i++) {
    const thursday = addDays(firstThursday, i * 7);
    if (thursday.getMonth() === month) {
      thursdays.push(thursday);
    }
  }
  return thursdays;
};

// Get all Sundays of the month
export const getAllSundaysOfMonth = (year: number, month: number): Date[] => {
  const sundays: Date[] = [];
  const firstDay = new Date(year, month, 1);
  const dayOfWeek = firstDay.getDay();
  const firstSunday = new Date(year, month, 1 + ((0 - dayOfWeek + 7) % 7)); // Find first Sunday

  for (let i = 0; i < 5; i++) {
    const sunday = addDays(firstSunday, i * 7);
    if (sunday.getMonth() === month) {
      sundays.push(sunday);
    }
  }
  return sundays;
};