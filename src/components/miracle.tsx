
import React from "react";
import Image from "next/image";
import yourImagePath from "/src/images/miracle.png";
import { Separator } from "@/components/ui/separator"

export function MiracleSection () {
  return (
    <section className="bg-gray-50 p-8 pt-10">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
        <Image
          src={yourImagePath}
          alt="Background"
          quality={100}
         
          style={{ objectFit: "cover" }}
        />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-4">I NEED A MIRACLE</h2>
          <p className="text-lg mb-8">
            Do you need a miracle? We could all use one in some area of our 
            lives. <span className="italic">This series tells the countless stories of Jesus healing, restoring 
            and providing—and how Hes still doing it today!</span> Come see what His
            miracles look like for you.
          </p>

          <Separator className="border-gray-200 mb-8" />

          <div className="flex justify-between items-center">
            <div className="bg-white rounded-lg p-4 shadow">
              <p className="text-lg font-mono">OUR NEXT SERVICE</p>
              <p className="text-3xl font-mono">00 : 06 : 55 : 13</p>
              <p className="text-sm font-mono">Day(s) Hour(s) Minute(s) Second(s)</p>  
            </div>

            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-500">
                <i className="fab fa-facebook text-2xl"></i>
              </a>
              <a href="#" className="hover:text-blue-400">
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a href="#" className="hover:text-orange-600">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

