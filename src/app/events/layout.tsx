import { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Events",
  description: "Join us for inspiring worship, fellowship, and growth. Check out our upcoming church events including Sunday services at 10:30 AM, Bible studies, and community gatherings in Sunnyvale, TX.",
  keywords: [
    "church events",
    "Sunday service",
    "worship service",
    "Bible study",
    "church calendar",
    "Sunnyvale church events",
    "community gatherings",
    "Christian fellowship",
  ],
  path: "/events",
});

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
