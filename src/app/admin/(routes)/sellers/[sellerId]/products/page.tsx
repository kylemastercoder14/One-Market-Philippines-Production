import db from "@/lib/db";
import React from "react";

const SpecificSellerProduct = async (props: {
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
  return <div>{seller?.name} Product</div>;
};

export default SpecificSellerProduct;
