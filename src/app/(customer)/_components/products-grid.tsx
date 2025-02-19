/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import db from "@/lib/db";
import ProductsGridClient from "./products-grid-client";

const ProductsGrid = async () => {
  const categories = await db.subCategory.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const products = await db.sellerProduct.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      seller: true,
      sellerProductVariants: {
        include: {
          sellerProductVariantsOptions: true,
        },
      },
    },
    take: 15,
  });

  return (
    <>
      {/* @ts-expect-error */}
      <ProductsGridClient categories={categories} products={products} />
    </>
  );
};

export default ProductsGrid;
