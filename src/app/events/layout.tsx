import { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Church Events & Sunday Services | The Serving Church Sunnyvale TX",
  description: "Join us for inspiring worship, fellowship, and growth every Sunday at 10 AM. Check out our upcoming church events including Bible studies and community gatherings at The Serving Church in Sunnyvale, TX.",
  keywords: [
    "church events Sunnyvale",
    "Sunday service Sunnyvale TX",
    "worship service",
    "church calendar",
    "Sunnyvale church events",
    "Bible study Sunnyvale",
    "community gatherings",
    "Christian fellowship",
    "church near me",
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
