"use client";

import React from "react";
import { Calendar } from "@/components/ui/calendar";
import Countdown, { CountdownRendererFn } from "react-countdown";

interface CountdownRenderProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const getNextSundayAt = (hour: number, minute: number) => {
  const now = new Date();
  const nextSunday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + ((7 - now.getDay()) % 7 || 7)
  );
  nextSunday.setHours(hour, minute, 0, 0);

  if (nextSunday <= now) {
    nextSunday.setDate(nextSunday.getDate() + 7);
  }

  return nextSunday;
};

const renderer: CountdownRendererFn = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}) => {
  if (completed) {
    return (
      <span className="text-2xl font-bold text-red-600">
        Church Is Now In Session
      </span>
    );
  } else {
    return (
      <div className="space-y-2">
        <p className="text-lg font-mono text-gray-600">OUR NEXT SERVICE</p>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-100 rounded-md p-4 text-center">
            <p className="text-4xl font-bold">
              {days.toString().padStart(2, "0")}
            </p>
            <p className="text-sm font-mono text-gray-500">Day(s)</p>
          </div>
          <div className="bg-gray-100 rounded-md p-4 text-center">
            <p className="text-4xl font-bold">
              {hours.toString().padStart(2, "0")}
            </p>
            <p className="text-sm font-mono text-gray-500">Hour(s)</p>
          </div>
          <div className="bg-gray-100 rounded-md p-4 text-center">
            <p className="text-4xl font-bold">
              {minutes.toString().padStart(2, "0")}
            </p>
            <p className="text-sm font-mono text-gray-500">Minute(s)</p>
          </div>
          <div className="bg-gray-100 rounded-md p-4 text-center">
            <p className="text-4xl font-bold">
              {seconds.toString().padStart(2, "0")}
            </p>
            <p className="text-sm font-mono text-gray-500">Second(s)</p>
          </div>
        </div>
      </div>
    );
  }
};

export function CountdownTimer() {
  const nextServiceStart = getNextSundayAt(10, 30);
  const nextServiceEnd = getNextSundayAt(13, 30);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Calendar className="mb-6 border border-gray-200 rounded-lg shadow-md" />
      <Countdown
        date={nextServiceStart}
        renderer={renderer}
        onComplete={() => {
          if (new Date() < nextServiceEnd) {
            return true;
          }
        }}
        onStart={() => {
          if (new Date() >= nextServiceEnd) {
            return getNextSundayAt(10, 30);
          }
        }}
      />
    </div>
  );
}
