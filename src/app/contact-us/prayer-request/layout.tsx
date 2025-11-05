import { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Prayer Requests",
  description: "Submit a prayer request to The Serving Church. Choose between public or private prayer requests. Our church community is here to pray with you and support you.",
  keywords: [
    "prayer request",
    "church prayer",
    "prayer support",
    "prayer form",
    "Christian prayer",
    "prayer community",
    "submit prayer request",
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
