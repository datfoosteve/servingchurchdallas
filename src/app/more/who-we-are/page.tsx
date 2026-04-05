// src/pages/more/who-we-are.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { SUPABASE_IMAGES } from '@/lib/supabase-image';
import { Card, CardContent } from '@/components/ui/card';

const WhoWeArePage = () => {
  const sections = [
    {
      title: 'Pastor and Family',
      people: [
        { name: 'Pastor Sam Thomas', role: 'Lead Pastor, Husband, Father', src: SUPABASE_IMAGES.miracle },
        { name: 'Hepsy Sam', role: "Pastor's Wife, Mother", src: SUPABASE_IMAGES.miracle },
        { name: 'Zion', role: "Pastor's Son", src: SUPABASE_IMAGES.miracle },
      ],
    },
    {
      title: 'Worship Leaders',
      people: [
        { name: 'Arlie Sam', role: 'Worship Leader, Vocalist', src: SUPABASE_IMAGES.miracle },
        { name: 'Jessica Thomas', role: 'Worship Leader, Guitarist', src: SUPABASE_IMAGES.miracle },
        { name: 'Sam Thomas', role: 'Worship Leader, Pianist', src: SUPABASE_IMAGES.miracle },
      ],
    },
    {
      title: 'Music Production Team',
      people: [
        { name: 'Jacob', role: 'Guitarist, Music Producer', src: SUPABASE_IMAGES.miracle },
        { name: 'Sam Thomas', role: 'Pianist, Music Producer', src: SUPABASE_IMAGES.miracle },
        { name: 'Justina Mathew', role: 'Vocalist, Music Producer', src: SUPABASE_IMAGES.miracle },
      ],
    },
  ];

  return (
    <main>
      <section className="bg-[#181818] py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 text-center md:px-6">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">Who We Are</p>
          <h1 className="text-4xl font-semibold text-brand-ivory md:text-5xl font-display">Meet the People of The Serving Church</h1>
          <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-[rgba(200,169,107,0.9)] to-transparent" />
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-brand-stone">
            Get to know the people who help lead, serve, and shape the life of our church community.
          </p>
        </div>
      </section>

      <section className="bg-brand-section py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="space-y-14 md:space-y-16">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="mb-6 text-3xl font-semibold text-[#1f1f1f] md:mb-8 font-display">{section.title}</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
                  {section.people.map((person, index) => (
                    <Card key={index} className="overflow-hidden rounded-[24px] border border-brand-border bg-white/88 shadow-sm">
                      <div className="relative aspect-square w-full">
                        <Image
                          alt={person.name}
                          className="object-cover"
                          src={person.src}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                      <CardContent className="p-5 md:p-6">
                        <h3 className="mb-2 text-xl font-semibold text-[#1f1f1f]">{person.name}</h3>
                        <p className="text-sm leading-6 text-[#625c53]">{person.role}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}

            <section>
              <h2 className="mb-6 text-3xl font-semibold text-[#1f1f1f] md:mb-8 font-display">Lead Photographer and Videographer</h2>
              <div className="flex justify-center">
                <Card className="w-full overflow-hidden rounded-[24px] border border-brand-border bg-white/88 shadow-sm sm:w-2/3 md:w-1/2">
                  <div className="relative aspect-square w-full">
                    <Image
                      alt="Marvin Mathew"
                      className="object-cover"
                      src={SUPABASE_IMAGES.miracle}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 66vw, 50vw"
                    />
                  </div>
                  <CardContent className="p-5 md:p-6">
                    <h3 className="mb-2 text-xl font-semibold text-[#1f1f1f]">Marvin Mathew</h3>
                    <p className="text-sm leading-6 text-[#625c53]">Lead Photographer and Videographer</p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WhoWeArePage;
