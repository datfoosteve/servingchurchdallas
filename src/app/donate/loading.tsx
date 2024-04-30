// app/donate/loading.tsx

import { Skeleton } from "@/components/ui/skeleton"; // Ensure this path is correct based on your project structure

export default function Loading() {
  return (
    <div className="loading-container p-4 space-y-2">
      {/* Simulating PayPal Button */}
      <Skeleton className="h-12 w-full rounded-md" style={{ backgroundColor: '#ffc439' }} />
      {/* Simulating Pay Later Button */}
      <Skeleton className="h-12 w-full rounded-md" style={{ backgroundColor: '#ffc439' }} />
      {/* Simulating Debit or Credit Card Button */}
      <Skeleton className="h-12 w-full rounded-md" style={{ backgroundColor: 'gray' }} />
    </div>
  );
}
