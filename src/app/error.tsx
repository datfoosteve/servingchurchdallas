"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Church, Home, RefreshCw, AlertCircle } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl border-2">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto bg-gradient-to-br from-red-600 to-orange-600 p-4 rounded-2xl w-fit">
            <AlertCircle className="h-16 w-16 text-white" />
          </div>
          <div className="space-y-2">
            <div className="text-8xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              500
            </div>
            <CardTitle className="text-3xl font-bold">Something Went Wrong</CardTitle>
            <CardDescription className="text-lg">
              We encountered an unexpected error. Please try again.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-gray-700 text-center">
              An unexpected error occurred while processing your request. Our team has been notified and we&apos;re working to fix it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={reset}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 h-auto py-4"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Try Again</div>
                <div className="text-xs opacity-90">Reload this page</div>
              </div>
            </Button>

            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full h-auto py-4">
                <Home className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">Go Home</div>
                  <div className="text-xs text-gray-500">Return to homepage</div>
                </div>
              </Button>
            </Link>
          </div>

          {error.digest && (
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 text-center">
                Error ID: <code className="bg-gray-200 px-2 py-1 rounded">{error.digest}</code>
              </p>
            </div>
          )}

          <div className="border-t pt-6">
            <p className="text-sm text-gray-600 text-center mb-4">Need Help?</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/contact-us/contact-church">
                <Button variant="link" size="sm" className="text-red-600">
                  Contact Us
                </Button>
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/prayers">
                <Button variant="link" size="sm" className="text-red-600">
                  Prayer Wall
                </Button>
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/events">
                <Button variant="link" size="sm" className="text-red-600">
                  Events
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
