"use client"

import React from 'react';
import Image from 'next/image';
import yourImagePath from '/src/images/samwise.png';


export function MovementComponent() {
    return (
      <div className="movement-container">
        <div className="central-figure">
          <Image
            src={yourImagePath}
            alt="Central Figure"
            placeholder="blur"
             quality={100}
             
             sizes="10vw"
      style={{
        objectFit: 'fill',
      }}
          />
        </div>
        <div className="text-content">
          <h2>A MOVEMENT FOR ALL PEOPLE TO</h2>
        </div>
        <div className="blocks-container">
        <div className="block know-god bg-gradient-to-b from-cyan-500 to-cyan-700 -z-50...">
  <p>KNOW GOD</p>
</div>
<div className="block find-freedom bg-gradient-to-b from-teal-500 to-teal-700 ...">
  <p>FIND FREEDOM</p>
</div>
<div className="block discover-calling bg-gradient-to-b from-yellow-500 to-yellow-700 ...">
  <p>DISCOVER CALLING</p>
</div>
<div className="block make-a-difference bg-gradient-to-b from-red-500 to-red-700 ...">
  <p>MAKE A DIFFERENCE</p>
</div>

      </div>
    </div>
  );
}
