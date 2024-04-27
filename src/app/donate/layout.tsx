// src/app/donate/layout.tsx
import { Rubik } from 'next/font/google';
import Script from 'next/script';

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
});

import { NavComponent } from "@/components/component/navcomponent";

type LayoutProps = {
  children: React.ReactNode;  // Explicitly typing the children prop
};

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Rubik font loaded with style */}
        <style>{`:root { --font-rubik: ${rubik.style.fontFamily};}`}</style>
      </head>
      <body className={rubik.variable}>
        <NavComponent />
        <Script
          src="https://www.paypal.com/sdk/js?client-id=Aei8lGQxd0aIRyJTmhuGCTDj_8tCd_9cG9liz-9tKVkMfz8NgZGzQ4km-JmBQ_PuFcrKs1vvCHhUlAfG"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
