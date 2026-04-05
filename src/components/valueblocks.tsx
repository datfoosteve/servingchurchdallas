import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Crown, Home, Sparkles } from "lucide-react";

const cardData = [
  {
    id: 1,
    title: "Aim to Look Like Christ",
    description:
      "Live each day reflecting the heart of Jesus through love, patience, humility, and grace in every part of life.",
    icon: Crown,
  },
  {
    id: 2,
    title: "Foster Heavenly Families",
    description:
      "Build homes shaped by faith, forgiveness, and the presence of God, where love leads and Christ is honored.",
    icon: Home,
  },
  {
    id: 3,
    title: "Experience God",
    description:
      "Seek a real encounter with the Lord through worship, prayer, scripture, and life together in community.",
    icon: Sparkles,
  },
];

export function ValueBlocks() {
  return (
    <section className="bg-brand-section py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">
            What We Hope For
          </p>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight text-[#201d18] md:text-4xl lg:text-5xl">
            Three commitments that shape our life together
          </h2>
          <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-[rgba(200,169,107,0.9)] to-transparent" />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#5f584f] md:text-lg">
            These are the values we want to practice as a church family: becoming more like Christ,
            strengthening our homes, and pursuing the presence of God with sincerity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:gap-10">
          {cardData.map((card) => {
            const Icon = card.icon;
            return (
              <Card
                key={card.id}
                className="group overflow-hidden rounded-[28px] border border-brand-border bg-[linear-gradient(180deg,rgba(42,42,42,0.96)_0%,rgba(31,31,31,0.98)_100%)] text-brand-ivory shadow-[0_14px_30px_rgba(0,0,0,0.16)] transition duration-300 hover:-translate-y-1 hover:border-[rgba(200,169,107,0.45)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.20)]"
              >
                <CardHeader className="pb-4 text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-brand-gold/30 bg-[rgba(200,169,107,0.08)] text-brand-gold">
                    <Icon className="h-7 w-7" strokeWidth={1.8} />
                  </div>
                  <CardTitle className="text-2xl font-semibold leading-tight text-brand-ivory">
                    {card.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-6 pb-8 pt-0 text-center">
                  <div className="mx-auto mb-6 h-px w-20 bg-gradient-to-r from-transparent via-[rgba(200,169,107,0.75)] to-transparent" />
                  <CardDescription className="text-base leading-8 text-brand-stone">
                    {card.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
