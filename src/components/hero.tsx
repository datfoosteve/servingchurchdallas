//src\components\hero.tsx

"use client";
import React from "react";
import Image from "next/image";
import yourImagePath from "/src/images/samwise.png";


export function MovementComponent() {
  return (
    <div>
  <section className="container mx-auto bg-gray-50">
    <div className="relative overflow-hidden">
      <Image
        src={yourImagePath}
        alt="Background"
        layout="responsive"
        objectFit="cover"
        width={1920}
        height={500}
        className="w-full h-auto"
      />
      <div className="absolute inset-0 bg-black bg-opacity-10 bg-gradient-to-l from-transparent from-30% to-black to-100%" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h2 className="sm:text-left sm:text-base lg:text-6xl font-medium text-white shadow-lg">
          <p className="bg-slate-500 bg-opacity-40 rounded-lg p-4 ">
            A <strong className="text-transparent font-extrabold bg-gradient-to-br from-blue-200 to-rose-600 bg-clip-text">
              FAMILY
            </strong> TRYING TO LOOK LIKE 
            <strong className="text-transparent font-extrabold bg-gradient-to-b from-amber-300 to-orange-500 bg-clip-text hover:animate-pulse animate-in">
              CHRIST
            </strong>
          </p>
        </h2>
      </div>



    </div>
  </section>
</div>

  );
}
