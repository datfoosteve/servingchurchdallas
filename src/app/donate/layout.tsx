// src/app/donate/layout.tsx
import { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import PayPalProvider from "./paypal-provider";

export const metadata: Metadata = createMetadata({
  title: "Donate",
  description: "Support The Serving Church's mission to share the love of Jesus. Your donations help us impact missions overseas in China, Sudan, and India, and support families in the DFW area through Careportal.",
  keywords: [
    "church donation",
    "donate to church",
    "support missions",
    "Christian giving",
    "church fundraising",
    "PayPal donation",
    "nonprofit donation",
    "missionary support",
  ],
  path: "/donate",
});

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <PayPalProvider>{children}</PayPalProvider>;
}
