import { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Prayer Requests | The Serving Church Sunnyvale TX",
  description: "Submit a prayer request to The Serving Church in Sunnyvale, TX. Choose between public or private prayer requests. Our church community is here to pray with you and support you.",
  keywords: [
    "prayer request Sunnyvale",
    "church prayer",
    "prayer support",
    "prayer form",
    "Christian prayer",
    "prayer community",
    "submit prayer request",
    "Sunnyvale TX church prayer",
  ],
  path: "/contact-us/prayer-request",
});

export default function PrayerRequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
