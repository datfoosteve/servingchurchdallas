// app/about-us/page.tsx

import { Button } from "@/components/ui/button";


const AboutUsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        About Us
      </h1>
      <p className="text-lg leading-relaxed mb-4">
        Here you can add details about the churchs mission, the values it upholds, and the various community activities it engages in.
      </p>
      <Button variant="default">Join Us</Button>
    </div>
  );
};

export default AboutUsPage;
