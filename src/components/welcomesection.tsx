import React from "react";
const Link = React.lazy(() =>
  import("next-view-transitions").then((module) => ({ default: module.Link }))
);
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";

export function WelcomeSection() {
  return (
    <section className="bg-brand-section py-16 md:py-24 lg:py-28">
      <div className="container mx-auto max-w-6xl px-4 text-center md:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">
            Welcome
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-[#1f1f1f] md:text-4xl lg:text-5xl">
            A place to worship, belong, and grow in Christ
          </h2>
          <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-[rgba(200,169,107,0.9)] to-transparent" />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#5e584f] md:text-lg">
            Whether you are visiting for the first time or looking for a church family to walk with,
            we want you to feel welcomed, grounded in scripture, and invited into genuine Christian community.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3 md:items-stretch">
          <div className="flex h-full flex-col rounded-3xl border border-brand-border bg-white/80 p-6 text-left shadow-sm backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-gold">Gather</p>
            <h3 className="mt-3 text-xl font-semibold text-[#1f1f1f]">Join us on Sunday</h3>
            <p className="mt-3 text-sm leading-7 text-[#625c53]">
              Worship with us each Sunday morning as we seek the presence of God together.
            </p>
            <p className="mt-auto pt-4 text-sm font-medium text-[#1f1f1f]">10:30 AM - 12:00 PM</p>
          </div>

          <div className="flex h-full flex-col rounded-3xl border border-brand-border bg-white/80 p-6 text-left shadow-sm backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-gold">Belong</p>
            <h3 className="mt-3 text-xl font-semibold text-[#1f1f1f]">Come as you are</h3>
            <p className="mt-3 text-sm leading-7 text-[#625c53]">
              We are a church family seeking to reflect Christ with humility, warmth, and faithful community.
            </p>
            <p className="mt-auto pt-4 text-sm font-medium text-[#1f1f1f]">Families, students, and visitors are welcome</p>
          </div>

          <div className="flex h-full flex-col rounded-3xl border border-brand-border bg-white/80 p-6 text-left shadow-sm backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-gold">Find us</p>
            <h3 className="mt-3 text-xl font-semibold text-[#1f1f1f]">Sunnyvale High School</h3>
            <p className="mt-3 text-sm leading-7 text-[#625c53]">
              We meet in the choir room and would love to help make your first visit simple.
            </p>
            <p className="mt-auto pt-4 text-sm font-medium text-[#1f1f1f]">222 Collins Rd, Sunnyvale, TX 75182</p>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Button
              asChild
              size="lg"
              className="h-14 w-full bg-brand-button text-brand-ivory shadow-lg transition hover:brightness-110 hover:shadow-xl"
            >
              <Link href="/contact-us/contact-church">
                <span className="flex items-center justify-center gap-2 text-base font-semibold">
                  Connect With Us
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 w-full border-brand-gold/40 bg-transparent text-[#1f1f1f] hover:bg-[rgba(200,169,107,0.10)] hover:text-[#1f1f1f]"
            >
              <Link href="/location">
                <span className="flex items-center justify-center gap-2 text-base font-semibold">
                  <MapPin className="h-5 w-5" />
                  Get Directions
                </span>
              </Link>
            </Button>
          </div>

          <div className="mt-5 flex justify-center">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#6e5b33] transition-colors hover:text-[#4f4022]"
            >
              View Events
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
