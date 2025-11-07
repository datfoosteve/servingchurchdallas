import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Location & Directions | Visit The Serving Church Sunnyvale TX",
  description: "Find us at Sunnyvale High School Choir Room, 222 Collins Rd, Sunnyvale, TX 75182. Get step-by-step directions to our Sunday worship service at 10 AM. Free parking available.",
  keywords: [
    "church location Sunnyvale",
    "Sunnyvale High School church",
    "directions to church",
    "Sunnyvale TX church",
    "222 Collins Rd Sunnyvale",
    "church near me",
    "how to find us",
    "church parking",
    "visit church Sunnyvale"
  ],
  openGraph: {
    title: "Location & Directions | Visit The Serving Church Sunnyvale TX",
    description: "Join us at Sunnyvale High School Choir Room every Sunday at 10 AM. Get detailed directions and parking information.",
    type: "website",
    locale: "en_US",
    siteName: "The Serving Church",
  },
  twitter: {
    card: "summary_large_image",
    title: "Location & Directions | Visit The Serving Church Sunnyvale TX",
    description: "Find us at Sunnyvale High School Choir Room, 222 Collins Rd, Sunnyvale, TX. Sundays at 10 AM.",
  },
};

export default function LocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
