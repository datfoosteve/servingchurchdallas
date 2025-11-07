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
        className="object-cover animate-[zoom-in_1.5s_ease-out]"
        style={{ objectPosition: "80% center" }}
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center px-4 md:px-6">
        <div className="max-w-4xl w-full text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg animate-[fade-in-up_1s_ease-out]">
            <span className="block bg-slate-900/40 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-white/10 shadow-2xl">
              <span className="inline-block animate-[fade-in-up_0.8s_ease-out_0.2s_both]">
                A{" "}
              </span>
              <strong className="inline-block font-extrabold text-transparent bg-gradient-to-br from-blue-300 via-purple-400 to-rose-500 bg-clip-text animate-[fade-in-up_0.8s_ease-out_0.4s_both,gradient-shift_4s_ease-in-out_infinite] bg-[length:200%_200%] drop-shadow-[0_0_30px_rgba(147,51,234,0.5)]">
                FAMILY
              </strong>{" "}
              <span className="inline-block animate-[fade-in-up_0.8s_ease-out_0.6s_both]">
                TRYING TO
              </span>{" "}
              <span className="inline-block animate-[fade-in-up_0.8s_ease-out_0.8s_both]">
                LOOK LIKE
              </span>{" "}
              <strong className="inline-block font-extrabold text-transparent bg-gradient-to-br from-amber-300 via-orange-400 to-orange-500 bg-clip-text animate-[fade-in-up_0.8s_ease-out_1s_both,gradient-shift_4s_ease-in-out_infinite] bg-[length:200%_200%] drop-shadow-[0_0_30px_rgba(251,146,60,0.5)]">
                CHRIST
              </strong>
            </span>
          </h1>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes zoom-in {
          from {
            transform: scale(1.1);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  );
}
