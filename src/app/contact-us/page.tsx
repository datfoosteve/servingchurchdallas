// src/pages/contact-us.tsx
import Link from 'next/link';
import React from 'react';
import { Card } from '@/components/ui/card'; // Corrected import
import { Button } from '@/components/ui/button'; // Corrected import

const ContactUsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <Card className="mb-6">
        <div className="p-4">
          <h2 className="text-2xl font-semibold">Contact Information</h2>
          <p><strong>Address:</strong> 123 Church Road, Heaven&apos;s Gate, HG 12345</p>
          <p><strong>Phone:</strong> (123) 456-7890</p>
          <p><strong>Email:</strong> info@yourchurch.com</p>
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-4">
        <Button asChild>
          <Link href="/contact-church">
            <div className="w-full h-full inline-flex justify-center items-center">Contact Church</div>
          </Link>
        </Button>
        <Button asChild>
          <Link href="/prayer-request">
            <div className="w-full h-full inline-flex justify-center items-center">Prayer Requests</div>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ContactUsPage;