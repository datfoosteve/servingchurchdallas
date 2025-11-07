import { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About The Serving Church | Christ-Centered Family in Sunnyvale TX",
  description: "Learn about The Serving Church's mission to bring the kingdom of God to Sunnyvale, Texas. Meet Pastor Sam Thomas and discover our commitment to serving the community and impacting the next generation.",
  keywords: [
    "about The Serving Church",
    "Sunnyvale TX church",
    "Pastor Sam Thomas",
    "church mission Sunnyvale",
    "Sunnyvale church community",
    "faith community Texas",
    "church leadership",
    "Christian ministry Sunnyvale",
    "family church Dallas area",
  ],
  path: "/about-us",
});

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
