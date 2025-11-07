"use client";
import React from "react";
import Image from "next/image";
import { SUPABASE_IMAGES } from "@/lib/supabase-image";

export function MovementComponent() {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-50">
      <Image
        src={SUPABASE_IMAGES.samwise}
        alt="Church community gathering - The Serving Church"
        fill
        className="object-cover"
        style={{ objectPosition: "80% center" }}
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center px-4 md:px-6">
        <div className="max-w-4xl w-full text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            <span className="block bg-slate-900/40 backdrop-blur-sm rounded-lg p-4 md:p-6">
              A{" "}
              <strong className="text-transparent font-extrabold bg-gradient-to-br from-blue-300 to-rose-500 bg-clip-text">
                FAMILY
              </strong>{" "}
              TRYING TO LOOK LIKE{" "}
              <strong className="text-transparent font-extrabold bg-gradient-to-b from-amber-300 to-orange-500 bg-clip-text">
                CHRIST
              </strong>
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
