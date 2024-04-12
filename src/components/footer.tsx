import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Button } from "@/components/ui/button";

export function Footer (){
    return (
      <footer className="bg-slate-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
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
            </div>
          </div>
          <div className="text-center">
            <p className="mb-4">
              SunnyvaleHighSchool | Some Address<br />
              | Sunnyvale, TX 75087<br />
              Mon - Thu: 8 AM - 5 PM | Sat: 5 PM - 8 PM<br />
              | Sun: 9 AM - 12 PM<br />
              469.735.2200
            </p>
            <div className="flex justify-center space-x-4 mb-4">
              <Link href="https://www.facebook.com/theservingchurch" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-2xl hover:text-gray-300" />
              </Link>
              <Link href="https://twitter.com/theservingchurch" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-2xl hover:text-gray-300" />
              </Link>
              <Link href="https://www.instagram.com/theservingchurch" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-2xl hover:text-gray-300" />
              </Link>
            </div>
            <p className="text-sm mb-4">
              Copyright &copy; {new Date().getFullYear()} - The Serving Church - All Rights Reserved | Privacy Policy
            </p>
            <Button variant="link" className="text-white hover:text-gray-300">
              <Link href="/contact">CONTACT US</Link>
            </Button>
          </div>
        </div>
      </footer>
    );
  };
  
