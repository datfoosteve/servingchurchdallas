

"use client";

import React from 'react';
const Link = React.lazy(() => import('next-view-transitions').then(module => ({ default: module.Link })));
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import ChurchIcon from '@/images/icons/ChurchIcon';
import FacebookIcon from '@/images/icons/FacebookIcon';
import TwitterIcon from '@/images/icons/TwitterIcon';
import InstagramIcon from '@/images/icons/InstagramIcon';
import MapPinIcon from '@/images/icons/MapPinIcon';
import PhoneIcon from '@/images/icons/PhoneIcon';
import MailIcon from '@/images/icons/MailIcon';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link className="flex items-center mb-6" href="/">
              <ChurchIcon className="h-8 w-8 text-white" />
              <span className="text-2xl font-semibold ml-2">The Serving Church</span>
            </Link>
            <p className="text-gray-400 mb-4">Living to Reflect the Image of Christ</p>
            <div className="flex space-x-4">
              <Link className="text-gray-400 hover:text-white transition-colors" href="https://www.facebook.com/theservingchurch">
                <FacebookIcon className="h-5 w-5" />
              </Link>
              <Link className="text-gray-400 hover:text-white transition-colors" href="https://twitter.com/theservingchurch">
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link className="text-gray-400 hover:text-white transition-colors" href="https://www.instagram.com/theservingchurch">
                <InstagramIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link className="hover:text-white transition-colors" href="/">Home</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/about-us">About Us</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/events">Events</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/donate">Donate</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li><MapPinIcon className="h-5 w-5 inline-block mr-2" />222 Collins Rd, Sunnyvale, TX 75182</li>
              <li><PhoneIcon className="h-5 w-5 inline-block mr-2" />(214) 738-6371</li>
              <li><MailIcon className="h-5 w-5 inline-block mr-2" />theservingchurchdallas@gmail.com</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Join Our Newsletter</h3>
            <p className="text-gray-400 mb-4">Stay updated with our latest news and events.</p>
            <form className="flex">
              <Input className="bg-gray-800 text-gray-200 py-2 px-4 rounded-l-md" placeholder="Enter your email" type="email" />
              <Button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-md transition-colors" type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} The Serving Church. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}


//import React from 'react';
// import Link from 'next/link';
// import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
// import { Button } from "@/components/ui/button";
// import { Separator } from '@/components/ui/separator';

// export function Footer (){
//     return (
//       <footer className="bg-slate-700 text-white py-12">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//           <div className="text-center">
//             <p className="mb-4">
//               <strong>The Serving Church</strong><br />
//               Sunnyvale High School <br />
//               Sunnyvale, TX 75087<br />
//              Sun: 9 AM - 12 PM<br />
//               469.735.7590
//             </p>
            
            
//           </div>
             
//             <div className="flex container justify-center grid-flow-row grid-cols-2 space-x-6 mb-4">
//               <Link href="https://www.facebook.com/theservingchurch" target="_blank" rel="noopener noreferrer">
//                 <FaFacebook className="text-6xl hover:text-gray-300" />
//               </Link>
//               <Link href="https://twitter.com/theservingchurch" target="_blank" rel="noopener noreferrer">
//                 <FaTwitter className="text-6xl hover:text-gray-300" />
//               </Link>
//               <Link href="https://www.instagram.com/theservingchurchdallas?igsh=MXJkNDA4bm4yY3dlNg==" target="_blank" rel="noopener noreferrer">
//                 <FaInstagram className="text-6xl hover:text-gray-300" />
//               </Link>
//               <Button className="text-white hover:text-gray-300">
//               CONTACT US
//             </Button>
//             </div>
//           </div>
//           <Separator className="border-gray-600" />
//           <p className="text-sm text-center mb-4 pt-6">
//               Copyright &copy; {new Date().getFullYear()} - The Serving Church - All Rights Reserved | Privacy Policy
//             </p>
            
//         </div>
//       </footer>
//     );
//   };