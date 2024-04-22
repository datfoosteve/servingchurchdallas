// src/components/LocationAndCountdown.tsx

"use client";

import React from 'react';
import OurLocation from './ourlocations';
import {CountdownTimer} from './countdowntimer';

const LocationAndCountdown: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="w-full md:w-1/2">
          <OurLocation />
        </div>
        <div className="w-full md:w-1/2">
          <CountdownTimer />
        </div>
      </div>
    </div>
  );
};

export default LocationAndCountdown;
