"use client";

import Image from "next/image";
import { SUPABASE_IMAGES } from "@/lib/supabase-image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChurchIcon from "@/images/icons/ChurchIcon";
import { Button } from "@/components/ui/button";
import React from "react";
const Link = React.lazy(() =>
  import("next-view-transitions").then((module) => ({ default: module.Link }))
);

export function MiracleSection() {
  return (
    <section className="bg-brand-section py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">
            Sermons
          </p>
          <h2 className="text-3xl font-semibold text-[#1f1f1f] md:text-4xl lg:text-5xl">
            Teaching from Pastor Sam Thomas
          </h2>
          <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-[rgba(200,169,107,0.9)] to-transparent" />
        </div>

        <Card className="mb-8 rounded-[28px] border border-brand-border bg-[linear-gradient(180deg,rgba(42,42,42,0.96)_0%,rgba(31,31,31,0.98)_100%)] text-brand-ivory shadow-[0_18px_40px_rgba(0,0,0,0.28)] md:mb-12">
          <CardHeader className="pb-5 text-center">
            <CardTitle className="text-xl font-semibold text-brand-ivory md:text-2xl lg:text-3xl">
              Last Week&apos;s Sermon
            </CardTitle>
            <CardDescription className="text-brand-stone">
              Listen again or share the latest message.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
            <div className="mx-auto max-w-3xl rounded-2xl border border-brand-gold/30 bg-black/15 p-4">
              <iframe
                src="https://embed.acast.com/63d6855a93dfbe00116a43c6?theme=light&font-family=Poppins&font-src=https%3A%2F%2Ffonts.googleapis.com%2Fcss%3Ffamily%3DPoppins"
                frameBorder="0"
                width="100%"
                height="80px"
                title="Last Week's Sermon"
                className="rounded-lg"
              ></iframe>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-brand-border bg-[linear-gradient(180deg,rgba(42,42,42,0.96)_0%,rgba(31,31,31,0.98)_100%)] shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,169,107,0.18),transparent_38%)]" />
            <Image
              src={SUPABASE_IMAGES.aiminlife}
              alt="What is your aim in life sermon series - The Serving Church Sunnyvale TX"
              fill
              className="object-contain p-8"
            />
          </div>

          <Card className="rounded-[28px] border border-brand-border bg-white/88 shadow-[0_18px_40px_rgba(0,0,0,0.10)]">
            <CardHeader className="pb-4">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-gold">
                Current Series
              </p>
              <CardTitle className="text-2xl font-semibold text-[#1f1f1f] md:text-3xl">
                A season of reflection and spiritual renewal
              </CardTitle>
              <CardDescription className="text-base leading-8 text-[#625c53] md:text-lg">
                We all face moments when life feels still — when faith, hope, or direction falter.
                Through Christ, we learn to rise, release the past, and move into the freedom of His light.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[rgba(200,169,107,0.8)] to-transparent" />
            </CardContent>
            <CardFooter className="justify-start pb-8">
              <Button
                asChild
                className="bg-brand-button text-brand-ivory shadow-lg transition hover:brightness-110 hover:shadow-xl"
                size="lg"
              >
                <Link href="/sermons">
                  <span className="flex items-center justify-center gap-2 font-semibold">
                    <ChurchIcon className="h-5 w-5 fill-white" />
                    Listen to Sermons
                  </span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
