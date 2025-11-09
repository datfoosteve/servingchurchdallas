"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl shadow-xl border-2">
            <CardHeader className="text-center space-y-4 pb-8">
              <div className="mx-auto bg-gradient-to-br from-red-600 to-orange-600 p-4 rounded-2xl w-fit">
                <AlertTriangle className="h-16 w-16 text-white" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-3xl font-bold">Critical Error</CardTitle>
                <CardDescription className="text-lg">
                  A critical error occurred. We&apos;re sorry for the inconvenience.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 pb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-gray-700 text-center">
                  We encountered a critical error that prevented the page from loading. Please try refreshing the page or contact us if the problem persists.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  onClick={reset}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 h-auto py-4"
                >
                  <RefreshCw className="mr-2 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">Try Again</div>
                    <div className="text-xs opacity-90">Reload the application</div>
                  </div>
                </Button>

                <a href="/" className="w-full">
                  <Button variant="outline" className="w-full h-auto py-4">
                    <div className="text-center w-full">
                      <div className="font-semibold">Return to Homepage</div>
                      <div className="text-xs text-gray-500">Start fresh</div>
                    </div>
                  </Button>
                </a>
              </div>

              {error.digest && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 text-center">
                    Error ID: <code className="bg-gray-200 px-2 py-1 rounded">{error.digest}</code>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </body>
    </html>
  );
}
