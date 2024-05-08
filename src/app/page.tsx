//src\app\page.tsx

import { MovementComponent } from "@/components/hero";
import { ValueBlocks } from "@/components/valueblocks";
import { WelcomeSection } from "@/components/welcomesection";
import { MiracleSection } from "@/components/miracle";
// import LocationAndCountdown from "@/components/locationandcountdown";



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0">
      
    
      <MovementComponent />
      <WelcomeSection />
      <ValueBlocks />
      <MiracleSection />
      {/* <LocationAndCountdown /> */}
    
      
    </main>
  );
}
