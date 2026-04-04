"use client";

import React from "react";
import Image from "next/image";
import { SUPABASE_IMAGES } from "@/lib/supabase-image";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
const Link = React.lazy(() =>
  import("next-view-transitions").then((module) => ({ default: module.Link }))
);

export function MovementComponent() {
  return (
    <section className="relative w-full min-h-[560px] overflow-hidden bg-brand-ink">
      <Image
        src={SUPABASE_IMAGES.samwise}
        alt="The Serving Church community worship gathering in Sunnyvale TX"
        fill
        className="object-cover"
        style={{ objectPosition: "78% center" }}
        priority
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,20,20,0.95)_0%,rgba(20,20,20,0.82)_42%,rgba(20,20,20,0.55)_68%,rgba(20,20,20,0.45)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,169,107,0.22),transparent_32%)]" />

      <div className="relative container mx-auto flex min-h-[560px] max-w-7xl items-center px-4 py-20 md:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-brand-gold/30 bg-black/20 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-brand-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-stone sm:text-sm">
              The Serving Church
            </span>
          </div>

          <div className="mb-8 max-w-2xl rounded-[28px] border border-brand-gold/30 bg-brand-panel p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-8 md:p-10">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgba(200,169,107,0.8)] to-transparent" />
              <span className="text-xs uppercase tracking-[0.38em] text-brand-gold">
                Sunnyvale, Texas
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgba(200,169,107,0.8)] to-transparent" />
            </div>

            <h1 className="text-4xl font-semibold leading-tight text-brand-ivory sm:text-5xl md:text-6xl">
              A family learning to
              <span className="block text-brand-gold">serve, gather, and look like Christ</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-brand-stone sm:text-lg">
              Join a church community centered on worship, prayer, scripture, and the life of Jesus.
              We gather each Sunday with a desire to grow in faith, love one another well, and serve our city with humility.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                size="lg"
                className="bg-brand-button-gold text-[#1f1f1f] shadow-lg transition hover:brightness-105 hover:shadow-xl"
              >
                <Link href="/contact-us/contact-church">
                  <span className="flex items-center gap-2 font-semibold">
                    Plan Your Visit
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-brand-gold/40 bg-black/10 text-brand-ivory hover:bg-white/5 hover:text-brand-ivory"
              >
                <Link href="/location">
                  <span className="flex items-center gap-2 font-semibold">
                    <MapPin className="h-4 w-4" />
                    Get Directions
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-brand-stone">
            <div>
              <span className="block text-xs uppercase tracking-[0.28em] text-brand-gold/90">Sunday Worship</span>
              <span className="mt-1 block text-brand-ivory">10:30 AM</span>
            </div>
            <div className="h-10 w-px bg-[rgba(200,169,107,0.25)]" />
            <div>
              <span className="block text-xs uppercase tracking-[0.28em] text-brand-gold/90">Location</span>
              <span className="mt-1 block text-brand-ivory">Sunnyvale High School Choir Room</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
