import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Church, Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl border-2">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-2xl w-fit">
            <Church className="h-16 w-16 text-white" />
          </div>
          <div className="space-y-2">
            <div className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              404
            </div>
            <CardTitle className="text-3xl font-bold">Page Not Found</CardTitle>
            <CardDescription className="text-lg">
              We couldn&apos;t find the page you&apos;re looking for.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700 text-center">
              The page you&apos;re trying to access might have been moved, deleted, or doesn&apos;t exist.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/" className="w-full">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-auto py-4">
                <Home className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">Go Home</div>
                  <div className="text-xs opacity-90">Return to homepage</div>
                </div>
              </Button>
            </Link>

            <Link href="/contact-us" className="w-full">
              <Button variant="outline" className="w-full h-auto py-4">
                <Search className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">Contact Us</div>
                  <div className="text-xs text-gray-500">Get help from our team</div>
                </div>
              </Button>
            </Link>
          </div>

          <div className="border-t pt-6">
            <p className="text-sm text-gray-600 text-center mb-4">Quick Links:</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/about">
                <Button variant="link" size="sm" className="text-blue-600">
                  About Us
                </Button>
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/events">
                <Button variant="link" size="sm" className="text-blue-600">
                  Events
                </Button>
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/prayers">
                <Button variant="link" size="sm" className="text-blue-600">
                  Prayer Wall
                </Button>
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/auth/login">
                <Button variant="link" size="sm" className="text-blue-600">
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
