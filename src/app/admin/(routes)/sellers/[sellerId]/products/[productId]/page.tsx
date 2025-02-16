import React from "react";
import db from "@/lib/db";
import ProductIdClient from "./_components/client";

const ProductId = async (props: {
  params: Promise<{
    sellerId: string;
    productId: string;
  }>;
}) => {
  const params = await props.params;

  const product = await db.sellerProduct.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      sellerProductVariants: {
        include: {
          sellerProductVariantsOptions: true,
        },
      },
    },
  });

  const seller = await db.seller.findUnique({
    where: {
      id: params.sellerId,
    },
  });
  return <ProductIdClient product={product} seller={seller} />;
};

export default ProductId;
