"use client";

import React, { Suspense } from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Loading from './loading';

const initialOptions = {
  clientId: "Aei8lGQxd0aIRyJTmhuGCTDj_8tCd_9cG9liz-9tKVkMfz8NgZGzQ4km-JmBQ_PuFcrKs1vvCHhUlAfG",
  currency: "USD",
  intent: "capture",
};

type PayPalProviderProps = {
  children: React.ReactNode;
};

export default function PayPalProvider({ children }: PayPalProviderProps) {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </PayPalScriptProvider>
  );
}
