// src/app/donate/layout.tsx
"use client";

import { Rubik } from 'next/font/google';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
});

import { NavComponent } from "@/components/component/navcomponent";
import { Footer } from '@/components/footer';

type LayoutProps = {
  children: React.ReactNode;  // Explicitly typing the children prop
};

export default function Layout({ children }: LayoutProps) {
  const initialOptions = {
    clientId: "Aei8lGQxd0aIRyJTmhuGCTDj_8tCd_9cG9liz-9tKVkMfz8NgZGzQ4km-JmBQ_PuFcrKs1vvCHhUlAfG", // use camelCase for clientId
  currency: "USD",
  intent: "capture",
    // Include any other options you need
  };
  
  return (
    <html lang="en">
      <head>
        {/* Rubik font loaded with style */}
        <style>{`:root { --font-rubik: ${rubik.style.fontFamily};}`}</style>
      </head>
      <body className={rubik.variable}>
        <NavComponent />
        <PayPalScriptProvider options={initialOptions}>
          {children}
        </PayPalScriptProvider>
      </body>
    </html>
  );
}
