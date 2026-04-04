"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Navigation, Phone, AlertCircle, CheckCircle2, ParkingCircle } from "lucide-react";
import { SUPABASE_IMAGES } from "@/lib/supabase-image";

const Link = React.lazy(() => import('next-view-transitions').then(module => ({ default: module.Link })));

export default function LocationPage() {
  const steps = [
    {
      step: 1,
      title: "Arrive at Sunnyvale High School",
      description: "Park in the main parking lot at 222 Collins Rd, Sunnyvale, TX 75182. Parking is free on Sundays.",
      icon: ParkingCircle,
    },
    {
      step: 2,
      title: "Locate the Choir Room Entrance",
      description: "Walk toward the building and follow signs directing you to the Choir Room.",
      icon: Navigation,
    },
    {
      step: 3,
      title: "Enter Through the Designated Door",
      description: "Use the entrance marked for the Choir Room. If doors are locked, call or text the number provided in your confirmation.",
      icon: MapPin,
    },
    {
      step: 4,
      title: "Welcome! You've Arrived",
      description: "Our greeters will welcome you and help you get settled before service begins at 10:30 AM.",
      icon: CheckCircle2,
    },
  ];

  return (
    <main className="min-h-screen bg-brand-section">
      <section className="bg-[#181818] py-16 text-brand-ivory md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <MapPin className="mx-auto mb-6 h-14 w-14 text-brand-gold" />
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">Location</p>
            <h1 className="mb-6 text-4xl font-semibold md:text-5xl lg:text-6xl">
              Find Us at Sunnyvale High School
            </h1>
            <p className="mb-4 text-xl text-brand-stone md:text-2xl">
              222 Collins Rd, Sunnyvale, TX 75182
            </p>
            <p className="mb-8 text-lg text-brand-stone">
              We meet in the Choir Room every Sunday.
            </p>
            <Button
              size="lg"
              className="bg-brand-button-gold px-8 py-6 text-lg text-[#1f1f1f] hover:brightness-105"
              onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=222+Collins+Rd,Sunnyvale,TX+75182', '_blank')}
            >
              <Navigation className="mr-2 h-5 w-5" />
              Get Directions in Google Maps
            </Button>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-10 py-8">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="rounded-[24px] border border-brand-border bg-white/88 shadow-lg">
              <CardHeader className="text-center pb-2">
                <Clock className="mx-auto mb-2 h-8 w-8 text-brand-gold" />
                <CardTitle className="text-lg text-[#1f1f1f]">Service Time</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-2xl font-semibold text-[#1f1f1f]">10:30 AM</p>
                <p className="text-[#625c53]">Every Sunday</p>
              </CardContent>
            </Card>

            <Card className="rounded-[24px] border border-brand-border bg-white/88 shadow-lg">
              <CardHeader className="text-center pb-2">
                <MapPin className="mx-auto mb-2 h-8 w-8 text-brand-gold" />
                <CardTitle className="text-lg text-[#1f1f1f]">Location</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="font-semibold text-[#1f1f1f]">Choir Room</p>
                <p className="text-[#625c53]">Sunnyvale High School</p>
              </CardContent>
            </Card>

            <Card className="rounded-[24px] border border-brand-border bg-white/88 shadow-lg">
              <CardHeader className="text-center pb-2">
                <Phone className="mx-auto mb-2 h-8 w-8 text-brand-gold" />
                <CardTitle className="text-lg text-[#1f1f1f]">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Button asChild variant="outline" className="w-full border-brand-gold/40 text-[#1f1f1f] hover:bg-[rgba(200,169,107,0.10)] hover:text-[#1f1f1f]">
                  <Link href="/contact-us/contact-church">Contact Us</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-3xl font-semibold text-[#1f1f1f] md:text-4xl">
            Interactive Map
          </h2>
          <div className="overflow-hidden rounded-[28px] border border-brand-border shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.7424773547885!2d-96.56154492381815!3d32.88503877362204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c1f5e5e5e5e5e%3A0x5e5e5e5e5e5e5e5e!2s222%20Collins%20Rd%2C%20Sunnyvale%2C%20TX%2075182!5e0!3m2!1sen!2sus!4v1234567890123"
              width="100%"
              height="500"
              className="border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sunnyvale High School Location"
            ></iframe>
          </div>
        </div>
      </section>

      <section className="bg-brand-section py-12 md:py-16">
        <div className="container mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-3xl font-semibold text-[#1f1f1f] md:text-4xl">
            Sunnyvale High School
          </h2>
          <div className="relative overflow-hidden rounded-[28px] border border-brand-border shadow-lg">
            <Image
              src={SUPABASE_IMAGES.sunnyvalehighschool}
              alt="Sunnyvale High School Choir Room - Where The Serving Church meets every Sunday"
              className="h-auto w-full"
              width={1200}
              height={675}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
          </div>
          <p className="mt-4 text-center text-sm text-[#625c53]">
            We meet in the Choir Room every Sunday at 10:30 AM.
          </p>
        </div>
      </section>

      <section className="bg-[#181818] py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-brand-gold" />
            <h2 className="mb-4 text-3xl font-semibold text-brand-ivory md:text-4xl">
              Step-by-Step Directions
            </h2>
            <p className="text-lg text-brand-stone">
              Follow these directions to find the Choir Room entrance.
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((item) => (
              <Card key={item.step} className="overflow-hidden rounded-[24px] border border-brand-border bg-[linear-gradient(180deg,rgba(42,42,42,0.96)_0%,rgba(31,31,31,0.98)_100%)] shadow-lg">
                <div className="flex flex-col md:flex-row">
                  <div className="flex items-center justify-center bg-[rgba(200,169,107,0.12)] p-6 md:w-24">
                    <div className="text-brand-gold text-center">
                      <item.icon className="mx-auto mb-2 h-10 w-10 md:hidden" />
                      <span className="text-4xl font-semibold md:text-5xl">{item.step}</span>
                    </div>
                  </div>
                  <CardContent className="flex-1 p-6">
                    <h3 className="mb-2 flex items-center gap-2 text-xl font-semibold text-brand-ivory">
                      <item.icon className="hidden h-5 w-5 text-brand-gold md:inline-flex" />
                      {item.title}
                    </h3>
                    <p className="leading-7 text-brand-stone">{item.description}</p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
