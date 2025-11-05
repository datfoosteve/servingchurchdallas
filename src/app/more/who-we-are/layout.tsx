import { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Who We Are",
  description: "Meet the team at The Serving Church. Learn about Pastor Sam Thomas, his family, our worship leaders, music production team, and ministry staff dedicated to serving God and the community.",
  keywords: [
    "church staff",
    "Pastor Sam Thomas",
    "worship leaders",
    "church team",
    "ministry team",
    "church leadership",
    "music ministry",
  ],
  path: "/more/who-we-are",
});

export default function WhoWeAreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
