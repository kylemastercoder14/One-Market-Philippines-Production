import React from "react";
import Heading from "@/components/ui/heading";
import PaymentMethodClient from "./_components/client";
import db from "@/lib/db";

const SellerPaymentMethod = async (props: {
  params: Promise<{
    sellerId: string;
  }>;
}) => {
  const params = await props.params;
  const existingBank = await db.sellerBank.findFirst({
    where: {
      sellerId: params.sellerId,
    },
  });
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading
          title="Accept Payments"
          description="Connect your payments manually or other third-party providers so your customers can pay."
        />
      </div>
      <PaymentMethodClient existingBank={existingBank} />
    </div>
  );
};

export default SellerPaymentMethod;
