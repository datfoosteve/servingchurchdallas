//src\app\page.tsx

import { MovementComponent } from "@/components/hero";
import { ValueBlocks } from "@/components/valueblocks";
import { WelcomeSection } from "@/components/welcomesection";
import { MiracleSection } from "@/components/miracle";
import { PrayerWall } from "@/components/prayer-wall";
import { createMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Home",
  description: "Welcome to The Serving Church - A church born to look like Christ. Join our community in Sunnyvale, Texas for worship, fellowship, and spiritual growth.",
  keywords: [
    "church Sunnyvale TX",
    "Christian church Dallas",
    "worship service",
    "community church",
    "faith community",
    "The Serving Church",
    "Sunday service",
  ],
  path: "/",
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0">
      <MovementComponent />
      <WelcomeSection />
      <MiracleSection />
      <ValueBlocks />
      <PrayerWall />
    </main>
  );
}
