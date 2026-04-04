// app/about-us/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SUPABASE_IMAGES } from "@/lib/supabase-image";
import ChurchIcon from "../../images/icons/ChurchIcon";
import HeartIcon from "../../images/icons/HeartIcon";

const AboutUsPage: React.FC = () => {
  return (
    <main>
      <section className="bg-[#181818] py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">
              About Us
            </p>
            <h1 className="text-4xl font-semibold text-brand-ivory md:text-5xl lg:text-6xl">
              About The Serving Church
            </h1>
            <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-[rgba(200,169,107,0.9)] to-transparent" />
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-brand-stone">
              Learn about our mission, our pastor, and the heart behind The Serving Church.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-section py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center justify-center">
              <div className="rounded-xl border border-brand-gold/30 bg-[rgba(200,169,107,0.10)] p-3 shadow-sm">
                <ChurchIcon className="h-6 w-6 text-brand-gold" />
              </div>
            </div>
            <h2 className="text-3xl font-semibold text-[#1f1f1f] md:text-4xl">
              Our Mission
            </h2>
          </div>
          <div className="rounded-[28px] border border-brand-border bg-white/85 p-8 shadow-[0_16px_40px_rgba(0,0,0,0.10)] md:p-12">
            <p className="text-center text-base leading-8 text-[#5f584f] md:text-lg lg:text-xl">
              Our church is committed to bringing the kingdom of God here in the city of Sunnyvale, Texas.
              We have a strong calling to the high school and to the district, so if you are interested in
              serving God by impacting the next generation at the schools, we would love to work alongside you.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#181818] py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center justify-center">
              <div className="rounded-xl border border-brand-gold/30 bg-[rgba(200,169,107,0.10)] p-3 shadow-sm">
                <HeartIcon className="h-6 w-6 text-brand-gold" />
              </div>
            </div>
            <h2 className="text-3xl font-semibold text-brand-ivory md:text-4xl">
              Meet Our Pastor
            </h2>
          </div>

          <div className="grid items-center gap-8 rounded-[28px] border border-brand-border bg-[linear-gradient(180deg,rgba(42,42,42,0.96)_0%,rgba(31,31,31,0.98)_100%)] p-8 shadow-[0_18px_40px_rgba(0,0,0,0.25)] md:grid-cols-2 md:p-12 lg:gap-12">
            <div className="order-2 space-y-5 md:order-1">
              <p className="text-base leading-8 text-brand-stone md:text-lg">
                <strong className="text-brand-ivory">Sam Thomas</strong> is the lead pastor at The Serving Church.
                He felt called to plant this church six years ago and wants to see the move of God more evident than ever in this generation.
                He has a Master&apos;s in Divinity from Perkins School of Theology at SMU.
              </p>
              <p className="text-base leading-8 text-brand-stone md:text-lg">
                Sam has been married to his wife, <strong className="text-brand-ivory">Hepzhi</strong>, for seven years.
                They have two lovely children, <strong className="text-brand-ivory">Zion</strong> and <strong className="text-brand-ivory">Mikah</strong>.
              </p>
            </div>

            <div className="order-1 md:order-2">
              <PastorImage />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const PastorImage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative mx-auto aspect-[3/2] w-full max-w-md sm:aspect-[4/3] md:aspect-square">
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse rounded-[24px] bg-white/10" />
      )}

      <Image
        src={error ? SUPABASE_IMAGES.church : SUPABASE_IMAGES.pastorfamily}
        alt="Pastor Sam Thomas and family"
        fill
        className={`rounded-[24px] object-cover shadow-xl transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ objectPosition: "center top" }}
        onLoadingComplete={() => setLoaded(true)}
        onError={() => setError(true)}
        sizes="(min-width: 1024px) 400px, 100vw"
      />
    </div>
  );
};

export default AboutUsPage;
