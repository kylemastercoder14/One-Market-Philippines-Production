import React from "react";
import Heading from "@/components/ui/heading";
import PaymentMethodClient from './_components/client';

const SellerPaymentMethod = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading
          title="Accept Payments"
          description="Connect your payments manually or other third-party providers so your customers can pay."
        />
      </div>
      <PaymentMethodClient />
    </div>
  );
};

export default SellerPaymentMethod;
