import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';

export function Footer (){
    return (
      <footer className="bg-slate-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="text-center">
            <p className="mb-4">
              Sunnyvale High School <br />
              | Sunnyvale, TX 75087<br />
             Sun: 9 AM - 12 PM<br />
              469.735.7590
            </p>
            <div className="flex justify-center space-x-4 mb-4">
              <Link href="https://www.facebook.com/theservingchurch" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-4xl hover:text-gray-300" />
              </Link>
              <Link href="https://twitter.com/theservingchurch" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-4xl hover:text-gray-300" />
              </Link>
              <Link href="https://www.instagram.com/theservingchurch" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-4xl hover:text-gray-300" />
              </Link>
            </div>
            
          </div>

            <div>
              <h3 className="text-xl font-bold mb-4">LOCATIONS</h3>
              <ul className="space-y-2">
                <li>Rockwall</li>
                <li>Mesquite</li>
                <li>Firewheel</li>
                <li>Forney</li>
                <li>North Dallas</li>
                <li>East Dallas</li>
                <li>Church Online</li>
                <li>Tamaulipas, Mexico</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">GET INVOLVED</h3>
              <ul className="space-y-2">
                <li>Groups</li>
                <li>Serve Teams</li>
                <li>Next Step Class</li>
                <li>Kids Ministry</li>
                <li>Student Ministry</li>
                <li>Missions</li>
                <li>Events</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">RESOURCES</h3>
              <ul className="space-y-2">
                <li>Messages</li>
                <li>Counseling</li>
                <li>Careers</li>
                <li>Account Login</li>
                <li>LP Español</li>
                <li>Prayer</li>
                <li>School of Ministry</li>
              </ul>
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
  
