import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prayer Wall | The Serving Church Sunnyvale TX",
  description: "Join our church family in prayer. View prayer requests from our community, pray for others, and submit your own prayer needs. Experience the power of united prayer at The Serving Church in Sunnyvale, TX.",
  keywords: [
    "prayer wall Sunnyvale",
    "prayer requests",
    "church prayers",
    "community prayer",
    "pray for others",
    "prayer support",
    "Christian prayer",
    "church community Sunnyvale",
    "Sunnyvale TX church",
    "answered prayers",
  ],
  openGraph: {
    title: "Community Prayer Wall | The Serving Church Sunnyvale TX",
    description: "Join us in prayer. Lift each other up, share burdens, and celebrate answered prayers together as a church family in Sunnyvale, TX.",
    type: "website",
    locale: "en_US",
    siteName: "The Serving Church",
  },
  twitter: {
    card: "summary_large_image",
    title: "Community Prayer Wall | The Serving Church",
    description: "Join our church family in prayer. View requests, pray for others, and share your needs.",
  },
};

export default function PrayersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
