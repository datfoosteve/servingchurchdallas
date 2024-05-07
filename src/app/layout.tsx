import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// import { Navigation } from "@/components/navigation";
import { NavComponent } from "@/components/component/navcomponent";

import { ThemeProvider } from "@/components/theme-provider";

import  Footer  from "@/components/footer";


export const metadata: Metadata = {
  title: "The Serving Church",
  description: "A church that was born to look like christ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navigation /> */}
        <NavComponent />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
