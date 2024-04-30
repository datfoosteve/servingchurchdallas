// // src/app/donate/layout.tsx
// "use client";

// import { Rubik } from 'next/font/google';
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// const rubik = Rubik({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-rubik',
// });



// type LayoutProps = {
//   children: React.ReactNode;  // Explicitly typing the children prop
// };

// export default function Layout({ children }: LayoutProps) {
//   const initialOptions = {
//     clientId: "Aei8lGQxd0aIRyJTmhuGCTDj_8tCd_9cG9liz-9tKVkMfz8NgZGzQ4km-JmBQ_PuFcrKs1vvCHhUlAfG", // Replace with actual client ID
//     currency: "USD",
//     intent: "capture",
//     // Include any other options you need
//   };
  
//   return (
//     <>
     
//       <PayPalScriptProvider options={initialOptions}>
//         {children}
//       </PayPalScriptProvider>
      
//     </>
//   );
// }
// // src/app/donate/layout.tsx
// "use client";

// import React, { Suspense } from 'react';
// // import { Rubik } from 'next/font/google';
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import Loading from './loading'; // Make sure the path is correct

// // const rubik = Rubik({
// //   subsets: ['latin'],
// //   display: 'swap',
// //   variable: '--font-rubik',
// // });

// type LayoutProps = {
//   children: React.ReactNode;  // Explicitly typing the children prop
// };

// export default function Layout({ children }: LayoutProps) {
//   const initialOptions = {
//     clientId: "Aei8lGQxd0aIRyJTmhuGCTDj_8tCd_9cG9liz-9tKVkMfz8NgZGzQ4km-JmBQ_PuFcrKs1vvCHhUlAfG",
//     currency: "USD",
//     intent: "capture",
//     // Include any other options you need
//   };

//   return (
//     <PayPalScriptProvider options={initialOptions} deferLoading={false}>
//             <Suspense fallback={<Loading />}>
//                 <PayPalButtons style={{ layout: "horizontal" }} />
//             </Suspense>
//         </PayPalScriptProvider>
//   );
// }
// src/app/donate/layout.tsx
"use client";

import React, { Suspense } from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Loading from './loading'; // Correct path assumed

const initialOptions = {
  clientId: "Aei8lGQxd0aIRyJTmhuGCTDj_8tCd_9cG9liz-9tKVkMfz8NgZGzQ4km-JmBQ_PuFcrKs1vvCHhUlAfG",
  currency: "USD",
  intent: "capture",
};

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </PayPalScriptProvider>
  );
}
