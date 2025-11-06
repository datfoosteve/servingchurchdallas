"use client";

import React from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { CreateOrderActions, CreateOrderData, OnApproveActions, OnApproveData } from "@paypal/paypal-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DonatePage = () => {
  const createOrder = (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
        if (!actions.order) {
            console.error("PayPal actions.order is undefined.");
            return Promise.reject("Order actions are undefined");
        }
        return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [{
                amount: {
                    currency_code: "USD",
                    value: '10.00'
                }
            }],
        });
      };
    
      const onApprove = (data: OnApproveData, actions: OnApproveActions): Promise<void> => {
        if (!actions.order) {
            console.error("PayPal actions are undefined.");
            return Promise.reject("Order actions are undefined");
        }
        return actions.order.capture().then(details => {
            if (!details) {
                console.error("Failed to capture order.");
                return Promise.reject("Failed to capture order");
            }
            // Use optional chaining and provide a fallback for the name
            const payerName = details.payer?.name?.given_name ?? "Unknown User";
            alert("Transaction completed by " + payerName);
            return Promise.resolve();
        });
    };

  const pastorsMessage = "We are a non profit organization who wants to share the love of Jesus with those around us. We use our funds to impact missions overseas, including China, Sudan, and India. We also want to touch those in the DFW area by supporting various needs on Careportal, an organization that partners with local agencies to protect families and keep families intact. Our hope is that our giving can be a light to people, as Gods love has lightened our life";  // The message remains the same

  return (
    <div className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-center">
              Support Our Cause
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-base text-gray-700 mb-6 leading-relaxed">
              {pastorsMessage}
            </p>
            <div className="flex flex-col items-center mt-4">
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                style={{ layout: "vertical" }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonatePage;
