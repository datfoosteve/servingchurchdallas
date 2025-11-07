//src\app\page.tsx

import { MovementComponent } from "@/components/hero";
import { Announcements } from "@/components/announcements";
import { ValueBlocks } from "@/components/valueblocks";
import { WelcomeSection } from "@/components/welcomesection";
import { MiracleSection } from "@/components/miracle";
import { PrayerWall } from "@/components/prayer-wall";
import { createMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Serving Church | Sunnyvale TX Church & Worship Community",
  description: "Welcome to The Serving Church - A family trying to look like Christ. Join our welcoming Christian community in Sunnyvale, Texas for worship, fellowship, and spiritual growth every Sunday at 10 AM.",
  keywords: [
    "church Sunnyvale TX",
    "Sunnyvale church",
    "church near me",
    "Christian church Dallas area",
    "worship service Sunnyvale",
    "community church",
    "faith community Texas",
    "The Serving Church",
    "Sunday service",
    "family church",
  ],
  alternates: {
    canonical: "https://servingchurchdallas.com",
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0">
      <MovementComponent />
      <Announcements />
      <WelcomeSection />
      <MiracleSection />
      <ValueBlocks />
      <PrayerWall />
    </main>
  );
}
