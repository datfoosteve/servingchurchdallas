import { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact Church",
  description: "Send a message to The Serving Church. Fill out our contact form and we'll get back to you soon. We'd love to hear from you and answer any questions you may have.",
  keywords: [
    "contact church form",
    "message church",
    "church inquiry",
    "contact form",
    "reach out to church",
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
