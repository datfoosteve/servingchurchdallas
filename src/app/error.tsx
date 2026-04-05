"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, RefreshCw, AlertCircle } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-section p-4">
      <Card className="w-full max-w-2xl rounded-[28px] border border-brand-border bg-white/88 shadow-xl">
        <CardHeader className="space-y-4 pb-8 text-center">
          <div className="mx-auto w-fit rounded-2xl border border-brand-gold/30 bg-[rgba(200,169,107,0.10)] p-4">
            <AlertCircle className="h-16 w-16 text-brand-gold" />
          </div>
          <div className="space-y-2">
            <div className="font-display text-8xl font-semibold text-[#6e5b33]">500</div>
            <CardTitle className="font-display text-3xl font-semibold text-[#1f1f1f]">Something Went Wrong</CardTitle>
            <CardDescription className="text-lg text-[#625c53]">
              We encountered an unexpected error. Please try again.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-8">
          <div className="rounded-xl border border-brand-gold/30 bg-[rgba(200,169,107,0.10)] p-4">
            <p className="text-center text-sm text-[#5f584f]">
              An unexpected error occurred while processing your request. Please try again or return home.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Button
              onClick={reset}
              className="h-auto w-full bg-brand-button text-brand-ivory py-4 hover:brightness-110"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Try Again</div>
                <div className="text-xs opacity-90">Reload this page</div>
              </div>
            </Button>

            <Link href="/" className="w-full">
              <Button variant="outline" className="h-auto w-full border-brand-gold/40 py-4 text-[#1f1f1f] hover:bg-[rgba(200,169,107,0.10)] hover:text-[#1f1f1f]">
                <Home className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">Go Home</div>
                  <div className="text-xs text-[#7a746c]">Return to homepage</div>
                </div>
              </Button>
            </Link>
          </div>

          {error.digest && (
            <div className="rounded-lg bg-gray-50 p-3">
              <p className="text-center text-xs text-gray-500">
                Error ID: <code className="rounded bg-gray-200 px-2 py-1">{error.digest}</code>
              </p>
            </div>
          )}

          <div className="border-t border-brand-border pt-6">
            <p className="mb-4 text-center text-sm text-[#625c53]">Need Help?</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/contact-us/contact-church">
                <Button variant="link" size="sm" className="text-[#6e5b33]">Contact Us</Button>
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/prayers">
                <Button variant="link" size="sm" className="text-[#6e5b33]">Prayer Wall</Button>
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/events">
                <Button variant="link" size="sm" className="text-[#6e5b33]">Events</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
