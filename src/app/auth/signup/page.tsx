"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Church, Mail, Lock, User, AlertCircle, Loader2, CheckCircle2, Shield } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<any>(null);
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate Turnstile
    if (!turnstileToken) {
      setError("Please complete the security verification");
      setLoading(false);
      return;
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      // Verify Turnstile token on server-side via API route
      const verifyResponse = await fetch('/api/verify-turnstile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: turnstileToken }),
      });

      if (!verifyResponse.ok) {
        throw new Error('Security verification failed. Please try again.');
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) throw signUpError;

      setSuccess(true);
      // Auto-redirect after 3 seconds
      setTimeout(() => {
        router.push("/member/dashboard");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
      // Reset Turnstile on error
      if (turnstileRef.current) {
        turnstileRef.current.reset();
      }
      setTurnstileToken(null);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (success) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl text-center">
          <CardHeader className="space-y-4">
            <div className="mx-auto bg-green-100 p-3 rounded-full w-fit">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Welcome to The Serving Church!</CardTitle>
              <CardDescription className="mt-2">
                Your account has been created successfully.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Please check your email to verify your account. You&apos;ll be redirected to your dashboard shortly...
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl w-fit">
            <Church className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Join Our Community</CardTitle>
            <CardDescription>
              Create your member account
            </CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={handleSignup}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="pl-10"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10"
                  required
                  disabled={loading}
                  minLength={8}
                />
              </div>
              <p className="text-xs text-gray-500">Must be at least 8 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Cloudflare Turnstile */}
            <div className="flex flex-col items-center gap-2 py-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Shield className="h-4 w-4" />
                <span>Security Verification</span>
              </div>
              {siteKey ? (
                <Turnstile
                  ref={turnstileRef}
                  siteKey={siteKey}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onError={() => {
                    setError("Security verification failed. Please refresh the page.");
                    setTurnstileToken(null);
                  }}
                  onExpire={() => setTurnstileToken(null)}
                  options={{
                    theme: 'light',
                    size: 'normal',
                  }}
                />
              ) : (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Security verification is not configured. Please contact support.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={loading || !turnstileToken}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
