import { Church } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-section">
      <div className="space-y-6 text-center">
        <div className="mx-auto w-fit rounded-2xl border border-brand-gold/30 bg-[rgba(200,169,107,0.10)] p-4 animate-pulse">
          <Church className="h-16 w-16 text-brand-gold" />
        </div>
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-semibold text-[#1f1f1f]">Loading...</h2>
          <p className="text-[#625c53]">Please wait while we prepare your page.</p>
        </div>
        <div className="flex justify-center gap-2">
          <div className="h-2 w-2 animate-bounce rounded-full bg-[#6e5b33]" style={{ animationDelay: "0ms" }}></div>
          <div className="h-2 w-2 animate-bounce rounded-full bg-brand-gold" style={{ animationDelay: "150ms" }}></div>
          <div className="h-2 w-2 animate-bounce rounded-full bg-[#6e5b33]" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </main>
  );
}
