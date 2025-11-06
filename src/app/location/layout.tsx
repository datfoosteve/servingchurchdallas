import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Location & Directions | The Serving Church",
  description: "Find us at Sunnyvale High School Choir Room, 222 Collins Rd, Sunnyvale, TX 75182. Get step-by-step directions to our Sunday worship service at 10:30 AM. Free parking available.",
  keywords: [
    "Sunnyvale High School",
    "church location",
    "directions",
    "Sunnyvale TX church",
    "222 Collins Rd",
    "choir room",
    "parking",
    "how to find us"
  ],
  openGraph: {
    title: "Location & Directions | The Serving Church",
    description: "Join us at Sunnyvale High School Choir Room every Sunday at 10:30 AM. Get detailed directions and parking information.",
    type: "website",
    locale: "en_US",
    siteName: "The Serving Church",
  },
  twitter: {
    card: "summary_large_image",
    title: "Location & Directions | The Serving Church",
    description: "Find us at Sunnyvale High School Choir Room. Get directions, parking info, and what to expect.",
  },
};

export default function LocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
