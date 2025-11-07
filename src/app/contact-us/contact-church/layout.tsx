import { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact The Serving Church | Sunnyvale TX",
  description: "Contact The Serving Church in Sunnyvale, TX. Fill out our contact form and we'll get back to you soon. We'd love to hear from you and answer any questions about our church.",
  keywords: [
    "contact church Sunnyvale",
    "Sunnyvale TX church contact",
    "message church",
    "church inquiry",
    "contact The Serving Church",
    "church communication",
  ],
  path: "/contact-us/contact-church",
});

export default function ContactChurchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
