import { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About Us",
  description: "Learn about The Serving Church's mission to bring the kingdom of God to Sunnyvale, Texas. Meet Pastor Sam Thomas and discover our commitment to serving the community and impacting the next generation.",
  keywords: [
    "about The Serving Church",
    "Pastor Sam Thomas",
    "church mission",
    "Sunnyvale church community",
    "faith community",
    "church leadership",
    "Christian ministry",
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
