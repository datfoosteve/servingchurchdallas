// src/pages/more/who-we-are.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import Miracle from "/src/images/miracle.png";

const WhoWeArePage = () => {
  return (
    <main key="1" className="w-full max-w-6xl mx-auto py-12 md:py-20 px-4 md:px-6">
      <div className="space-y-12 md:space-y-16">
        <section>
          <h2 className="text-3xl font-bold mb-6 md:mb-8">Pastor and Family</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { name: "Pastor Sam Thomas", role: "Lead Pastor, Husband, Father", src: Miracle },
              { name: "Hepsy Sam", role: "Pastor's Wife, Mother", src: Miracle },
              { name: "Zion", role: "Pastor's Son", src: Miracle }
            ].map((person, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative w-full aspect-square">
                  <Image
                    alt={person.name}
                    className="object-cover"
                    src={person.src}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-xl font-semibold mb-2">{person.name}</h3>
                  <p className="text-gray-500 text-sm">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 md:mb-8">Worship Leaders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { name: "Arlie Sam", role: "Worship Leader, Vocalist", src: Miracle },
              { name: "Jessica Thomas", role: "Worship Leader, Guitarist", src: Miracle },
              { name: "Sam Thomas", role: "Worship Leader, Pianist", src: Miracle }
            ].map((leader, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative w-full aspect-square">
                  <Image
                    alt={leader.name}
                    className="object-cover"
                    src={leader.src}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-xl font-semibold mb-2">{leader.name}</h3>
                  <p className="text-gray-500 text-sm">{leader.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>


        <section>
          <h2 className="text-3xl font-bold mb-6 md:mb-8">Music Production Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { name: "Jacob", role: "Guitarist, Music Producer", src: Miracle },
              { name: "Sam Thomas", role: "Pianist, Music Producer", src: Miracle },
              { name: "Justina Mathew", role: "Vocalist, Music Producer", src: Miracle }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative w-full aspect-square">
                  <Image
                    alt={member.name}
                    className="object-cover"
                    src={member.src}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-gray-500 text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 md:mb-8">Lead Photographer and Videographer</h2>
          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full sm:w-2/3 md:w-1/2">
              <div className="relative w-full aspect-square">
                <Image
                  alt="Marvin Mathew"
                  className="object-cover"
                  src={Miracle}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 66vw, 50vw"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-xl font-semibold mb-2">Marvin Mathew</h3>
                <p className="text-gray-500 text-sm">Lead Photographer and Videographer</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};

export default WhoWeArePage;