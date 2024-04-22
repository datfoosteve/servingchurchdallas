"use client";
import React from "react";
import Image from "next/image";
import yourImagePath from "/src/images/samwise.png";
import { Separator } from "@/components/ui/separator";

export function MovementComponent() {
  return (
    <div className="movement-container place-content-center p-1 z-0">
      <div className="hero-section relative inline-block">
        <Image src={yourImagePath} alt="Background" height={500} width={1920} />
        <div className="text-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-4xl font-bold text-white text-center shadow-lg border-b-0 px-4 sm:text-left">
            <p className="prose">
              A <strong className="">FAMILY</strong> TRYING TO LOOK LIKE{" "}
              <strong>CHRIST</strong>
            </p>
          </h2>
        </div>
      </div>
      <div className="blocks-container grid grid-cols-1 sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 px-4 sm:px-8 lg:px-40 -translate-y-16 sm:-translate-y-24 lg:-translate-y-32">
        <div className="block know-god bg-gradient-to-br from-[#33869b] to-[#197fa4] text-white p-8">
          <p className="text-2xl font-bold text-left pt-24 sm:pt-32">
            EXPERIENCE GOD
          </p>
        </div>
        <div className="block find-freedom bg-gradient-to-br from-[#308295] to-[#b8c1be] text-white p-8">
          <p className="text-2xl font-bold text-left pt-24 sm:pt-32">
            BECOME A DISCIPLE
          </p>
        </div>
        <div className="block discover-calling bg-gradient-to-br from-[#b1ada4] to-[#c3440d] text-white p-8">
          <p className="text-2xl font-bold text-left pt-24 sm:pt-32">
            FIND YOUR PURPOSE
          </p>
        </div>
        <div className="block make-a-difference bg-gradient-to-br from-[#8a8684] to-[#f36f0a] text-white p-8">
          <p className="text-2xl font-bold text-left pt-24 sm:pt-32">
            JOIN A FAMILY
          </p>
        </div>
      </div>
      <div className="welcome-section px-4 sm:px-8">
        <h2 className="text-4xl font-bold text-center mb-4">
          YOU&apos;RE WELCOME HERE!
        </h2>
        <Separator className="bg-red-600" />
        <p className="text-lg text-center m-8">
          Serving Church is a vibrant community united in our mission to reflect
          Christ more closely each day. No matter where you come from or what
          your story is, you are welcome to join us in our journey of faith and
          service. Our guiding principle, inspired by John 13:15, calls us to
          emulate Christ&apos;s example: &quot;For I have given you an example,
          that you also should do just as I have done to you.&quot; At Serving
          Church, you&apos;ll discover a family committed not just to the
          organization but to the transformative power of living for something
          greater than ourselves. We believe that a strong church is built on
          members who are devoted to this mission. Here, you will find a place
          to belong and grow in the fullness of life that God intends for us
          all. Welcome Home!
        </p>
        <div className="text-center">
          <button className="bg-red-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-600 transition duration-200 mb-10">
            READ OUR STORY
          </button>
        </div>
      </div>
    </div>
  );
}
