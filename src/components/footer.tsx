import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';

export function Footer (){
    return (
      <footer className="bg-slate-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="text-center">
            <p className="mb-4">
              <strong>The Serving Church</strong><br />
              Sunnyvale High School <br />
              Sunnyvale, TX 75087<br />
             Sun: 9 AM - 12 PM<br />
              469.735.7590
            </p>
            
            
          </div>
             
            <div className="flex container justify-center grid-flow-row grid-cols-2 space-x-6 mb-4">
              <Link href="https://www.facebook.com/theservingchurch" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-6xl hover:text-gray-300" />
              </Link>
              <Link href="https://twitter.com/theservingchurch" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-6xl hover:text-gray-300" />
              </Link>
              <Link href="https://www.instagram.com/theservingchurch" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-6xl hover:text-gray-300" />
              </Link>
              <Button className="text-white hover:text-gray-300">
              CONTACT US
            </Button>
            </div>
          </div>
          <Separator className="border-gray-600" />
          <p className="text-sm text-center mb-4 pt-6">
              Copyright &copy; {new Date().getFullYear()} - The Serving Church - All Rights Reserved | Privacy Policy
            </p>
            
        </div>
      </footer>
    );
  };
  
