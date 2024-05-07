import React from "react";
import { Separator } from "@/components/ui/separator";

export function WelcomeSection() {
  return (
    <section className="welcome-section px-4 sm:px-8">
      <h2 className="text-4xl font-bold text-center mb-4">
        YOU&apos;RE WELCOME HERE!
      </h2>
      <Separator className="bg-red-600" />
      <p className="text-lg text-center m-8">
      Serving Church is a vibrant community united in our mission to reflect
          Christ more closely each day. No matter where you come from or what
          your story is, you are welcome to join us in our journey of faith and
          service. Our guiding principle, inspired by John 13:15, calls us to
          emulate Christ&apos;s example: &quot;For I have given you an example,
          that you also should do just as I have done to you.&quot; At Serving
          Church, you&apos;ll discover a family committed not just to the
          organization but to the transformative power of living for something
          greater than ourselves. We believe that a strong church is built on
          members who are devoted to this mission. Here, you will find a place
          to belong and grow in the fullness of life that God intends for us
          all. Welcome Home!
      </p>
      <div className="text-center">
        <button className="bg-red-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-600 transition duration-200 mb-10">
          READ OUR STORY
        </button>
      </div>
    </section>
  );
}
