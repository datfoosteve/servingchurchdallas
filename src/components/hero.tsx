//src\components\hero.tsx

"use client";
import React from "react";
import Image from "next/image";
import yourImagePath from "/src/images/samwise.png";


export function MovementComponent() {
  return (
    // <div>

    //   <section className="container rounded">
    //     <div className="movement-container place-content-center p-1 z-0 w-screen">
    //       <div className="hero-section relative inline-block">
    //         <Image
    //           src={yourImagePath}
    //           alt="Background"
    //           height={500}
    //           width={1920}
    //         />
    //         <div className="text-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
    //           <h2 className="md:text-4xl sm:text-base lg:text-6xl text-border border-gray-950 font-bold text-white text-center shadow-lg border-b-1 px-4 sm:text-left">
    //             <p className="prose bg-slate-500 bg-opacity-40 bg-accent rounded-lg text-center">
    //               A{" "}
    //               <strong className="bg-gradient-to-br from-blue-800 to-rose-600 bg-clip-text text-transparent">
    //                 FAMILY
    //               </strong>{" "}
    //               TRYING TO LOOK LIKE{" "}
    //               <strong className=" bg-gradient-to-b accent-gray-950 border-l-accent from-amber-300 to-orange-500 text-transparent bg-clip-text max-w-xs transition duration-300 ease-in-out hover:scale-110">
    //                 CHRIST
    //               </strong>
    //             </p>
    //           </h2>
    //         </div>
    //       </div>
    //     </div>
    //   </section>

      
    // </div>

    <div>
  <section className="container mx-auto bg-gray-50">
    <div className="relative overflow-hidden">
      <Image
        src={yourImagePath}
        alt="Background"
        layout="responsive"
        objectFit="cover"
        width={1920}
        height={500}
        className="w-full h-auto"
      />
      <div className="absolute inset-0 bg-black bg-opacity-10 bg-gradient-to-l from-transparent from-30% to-black to-100%" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h2 className="sm:text-left sm:text-base lg:text-6xl font-bold text-white shadow-lg">
          <p className="bg-slate-500 bg-opacity-40 rounded-lg p-4 ">
            A <strong className="text-transparent bg-gradient-to-br from-blue-800 to-rose-600 bg-clip-text">
              FAMILY
            </strong> TRYING TO LOOK LIKE 
            <strong className="text-transparent bg-gradient-to-b from-amber-300 to-orange-500 bg-clip-text">
              CHRIST
            </strong>
          </p>
        </h2>
      </div>



    </div>
  </section>
</div>

  );
}
