import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Church, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-section p-4">
      <Card className="w-full max-w-2xl rounded-[28px] border border-brand-border bg-white/88 shadow-xl">
        <CardHeader className="space-y-4 pb-8 text-center">
          <div className="mx-auto w-fit rounded-2xl border border-brand-gold/30 bg-[rgba(200,169,107,0.10)] p-4">
            <Church className="h-16 w-16 text-brand-gold" />
          </div>
          <div className="space-y-2">
            <div className="font-display text-8xl font-semibold text-[#6e5b33]">404</div>
            <CardTitle className="font-display text-3xl font-semibold text-[#1f1f1f]">Page Not Found</CardTitle>
            <CardDescription className="text-lg text-[#625c53]">
              We couldn&apos;t find the page you&apos;re looking for.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-8">
          <div className="rounded-xl border border-brand-gold/30 bg-[rgba(200,169,107,0.10)] p-4">
            <p className="text-center text-sm text-[#5f584f]">
              The page you&apos;re trying to access might have been moved, deleted, or doesn&apos;t exist.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link href="/" className="w-full">
              <Button className="h-auto w-full bg-brand-button text-brand-ivory py-4 hover:brightness-110">
                <Home className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">Go Home</div>
                  <div className="text-xs opacity-90">Return to homepage</div>
                </div>
              </Button>
            </Link>

            <Link href="/contact-us" className="w-full">
              <Button variant="outline" className="h-auto w-full border-brand-gold/40 py-4 text-[#1f1f1f] hover:bg-[rgba(200,169,107,0.10)] hover:text-[#1f1f1f]">
                <Search className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">Contact Us</div>
                  <div className="text-xs text-[#7a746c]">Get help from our team</div>
                </div>
              </Button>
            </Link>
          </div>

          <div className="border-t border-brand-border pt-6">
            <p className="mb-4 text-center text-sm text-[#625c53]">Quick Links:</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/about-us">
                <Button variant="link" size="sm" className="text-[#6e5b33]">
                  About Us
                </Button>
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/events">
                <Button variant="link" size="sm" className="text-[#6e5b33]">
                  Events
                </Button>
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/prayers">
                <Button variant="link" size="sm" className="text-[#6e5b33]">
                  Prayer Wall
                </Button>
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/auth/login">
                <Button variant="link" size="sm" className="text-[#6e5b33]">
                  Member Login
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
