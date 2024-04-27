"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

declare global {
  interface Window {
    PayPal: {
      Donation: {
        Button: (config: {
          env: string,
          hosted_button_id?: string,
          business?: string,
          image: {
            src: string,
            title: string,
            alt: string
          },
          onComplete: (params: { tx: string; [key: string]: any }) => void
        }) => {
          render: (selector: string) => void;
        };
      }
    };
  }
}

const DonateComponent: React.FC = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.PayPal) {
      window.PayPal.Donation.Button({
        env: 'sandbox', // Change to 'production' when going live
        hosted_button_id: 'YOUR_SANDBOX_HOSTED_BUTTON_ID',
        image: {
          src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif',
          title: 'PayPal - The safer, easier way to pay online!',
          alt: 'Donate with PayPal button'
        },
        onComplete: function (params: { tx: string; [key: string]: any }) {
          alert(`Donation completed! Transaction ID: ${params.tx}`);
          // Additional handling here
        },
      }).render('#paypal-donate-button-container');
    }
  }, [donationAmount]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    form.action = `https://www.paypal.com/donate?business=Q2HBGQMRY9HEJ&no_recurring=0&item_name=Fuel our mission of love and service. Your generosity nurtures peace and compassion, helping us care for all in Christ's love.&currency_code=USD&amount=${donationAmount}`;
    form.submit();
  };

  return (
    <div className="flex min-h-[100vh] flex-col items-center justify-center bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <h1 className="text-4xl font-bold tracking-tight text-[#1F2937] sm:text-5xl">Support Our Cause</h1>
        <p className="text-lg font-medium leading-relaxed text-[#6B7280]">
  We are a non-profit organization who wants to share the love of Jesus with those around us.
  We use our funds to impact missions overseas, including China, Sudan, and India.
  We also support various needs in the DFW area through Careportal.
  Our hope is that our giving can be a light to people, as God&apos;s love has lightened our life.
</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="amount" className="block text-sm font-medium text-[#6B7280]">Donation Amount</Label>
            <div className="mt-2 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-[#D1D5DB] bg-[#F3F4F6] px-3 text-[#6B7280]">$</span>
              <Input
                className="block w-full rounded-r-md border-[#D1D5DB] focus:border-[#6366F1] focus:ring-[#6366F1]"
                id="amount"
                min="1"
                name="amount"
                placeholder="25"
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" className="w-full rounded-md bg-[#6366F1] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2">
            Donate Now
          </Button>
        </form>
        <div id="paypal-donate-button-container" ref={paypalRef}></div>
      </div>
    </div>
  );
};

export default DonateComponent;
