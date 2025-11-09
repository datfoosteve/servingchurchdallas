import { Church } from "lucide-react";

export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="mx-auto bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-2xl w-fit animate-pulse">
          <Church className="h-16 w-16 text-white" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Loading...</h2>
          <p className="text-gray-600">Please wait while we prepare your page</p>
        </div>
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </main>
  );
}
