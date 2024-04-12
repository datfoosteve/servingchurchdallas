"use client";
import React from "react";
import Image from "next/image";
import yourImagePath from "/src/images/samwise.png";
import { Separator } from "@/components/ui/separator"



export function MovementComponent() {
  return (
    <div className="movement-container p-0">
      <div className="hero-section relative">
        <Image
          src={yourImagePath}
          alt="Background"
          quality={100}
         
          style={{ objectFit: "cover" }}
        />
        <div className="text-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-4xl font-bold text-white text-left">
            A MOVEMENT FOR ALL PEOPLE TO
          </h2>
        </div>
      </div>
      <div className="blocks-container grid grid-cols-4 gap-4 mt-8 px-40 -translate-y-32">
        <div className="block know-god bg-blue-500 text-white p-8 ">
          <p className="text-2xl font-bold text-end pt-32">KNOW GOD</p>
        </div>
        <div className="block find-freedom bg-teal-500 text-white p-8 ">
          <p className="text-2xl font-bold text-center pt-32">FIND FREEDOM</p>
        </div>
        <div className="block  discover-calling bg-red-300 from-cyan-900 bg-gradient-to-r text-white p-8 ">
          <p className="text-2xl font-bold text-center pt-32">DISCOVER CALLING</p>
        </div>
        <div className="block make-a-difference bg-red-500 text-white p-8 ">
          <p className="text-2xl font-bold text-center pt-32">MAKE A DIFFERENCE</p>
        </div>
      </div>
      <div className="welcome-section px-8">
      <h2 className="text-4xl font-bold text-center mb-4">
  YOU&apos;RE WELCOME HERE!
</h2>
<Separator className="bg-red-600 "/>
        <p className="text-lg text-center m-8">
       
Serving Church is a vibrant community united in our mission to reflect Christ more closely each day. No matter where you come from or what your story is, you are welcome to join us in our journey of faith and service. Our guiding principle, inspired by John 13:15, calls us to emulate Christs example: “For I have given you an example, that you also should do just as I have done to you.”

At Serving Church, youll discover a family committed not just to the organization but to the transformative power of living for something greater than ourselves. We believe that a strong church is built on members who are devoted to this mission. Here, you will find a place to belong and grow in the fullness of life that God intends for us all. Welcome Home!
        </p>
        <div className="text-center">
          <button
            className="bg-red-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-600 transition duration-200 mb-10"
          >
            READ OUR STORY
          </button>
        </div>
      </div>
    </div>
  );
}