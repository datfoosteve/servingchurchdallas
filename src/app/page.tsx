

import Image from "next/image";

import { MovementComponent } from "@/components/hero";
import { MiracleSection } from "@/components/miracle";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0">
      
    
      <MovementComponent />
      <MiracleSection />
      <Image src="/logo.svg" width={200} height={200} alt="Logo" />
    </main>
  );
}
