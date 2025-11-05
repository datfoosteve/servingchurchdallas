import { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Gallery",
  description: "Experience the beauty and spiritual atmosphere of The Serving Church through our photo gallery. View images from our worship services, events, and community gatherings.",
  keywords: [
    "church gallery",
    "church photos",
    "worship photos",
    "church events",
    "community photos",
    "The Serving Church gallery",
    "church photography",
  ],
  path: "/more/gallery",
});

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
