import db from "@/lib/db";
import React from "react";
import StoreClient from "../_components/client";

const SpecificSeller = async (props: {
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

  const products = await db.sellerProduct.findMany({
    where: {
      sellerId: params.sellerId,
    },
    include: {
      sellerProductVariants: {
        include: {
          sellerProductVariantsOptions: true,
        },
      },
    },
  });
  return (
    <div className="px-5 w-full">
      <StoreClient seller={seller} products={products} />
    </div>
  );
};

export default SpecificSeller;
