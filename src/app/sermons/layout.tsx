import { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Sermons & Messages | Pastor Sam Thomas - Sunnyvale TX Church",
  description: "Listen to inspiring sermons and messages from Pastor Sam Thomas at The Serving Church in Sunnyvale, TX. Weekly messages focused on faith, family, and following Christ.",
  keywords: [
    "church sermons",
    "Pastor Sam Thomas sermons",
    "Sunnyvale TX church sermons",
    "Christian messages",
    "worship messages",
    "Bible teaching",
    "church podcast",
    "weekly sermons",
  ],
  path: "/sermons",
});

export default function SermonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
