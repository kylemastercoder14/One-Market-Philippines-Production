import db from "@/lib/db";
import React from "react";

const SpecificSellerOrders = async (props: {
  params: Promise<{
    sellerId: string;
  }>;
}) => {
  const params = await props.params;
  const seller = await db.seller.findUnique({
    where: {
      id: params.sellerId,
    },
  });
  return <div>{seller?.name} Orders</div>;
};

export default SpecificSellerOrders;
