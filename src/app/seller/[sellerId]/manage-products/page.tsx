import React from "react";
import db from "@/lib/db";
import { ProductColumn } from "./_components/column";
import ProductClient from "./_components/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SellerProducts = async (props: {
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

  const data = await db.sellerProduct.findMany({
    where: {
      sellerId: params.sellerId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      sellerProductVariants: {
        include: {
          sellerProductVariantsOptions: true,
        },
      },
      subCategory: true,
    },
  });

  const formattedData: ProductColumn[] =
    data.map((item) => {
      // Flatten all options to find the minimum price but exclude the zero prices
      const lowestPrice = item.sellerProductVariants.reduce((acc, variant) => {
        const price = variant.sellerProductVariantsOptions.reduce(
          (acc, option) => {
            if (option.price === 0) {
              return acc;
            }

            return option.price !== null ? Math.min(acc, option.price) : acc;
          },
          Infinity
        );

        return Math.min(acc, price);
      }, Infinity);

      const isThereAPrice = item.price !== null && item.price !== 0;
      const priceWithVariants =
        lowestPrice !== Infinity
          ? `Starts at ₱${lowestPrice.toFixed(2)}`
          : `₱${item.price?.toFixed(2) ?? "0.00"}`;

      return {
        id: item.id,
        name: item.name,
        image: item.images[0],
        category: item.subCategory?.name,
        sku: item.sku,
        availability: item.status,
        slug: item.slug,
        status: item.adminApprovalStatus,
        isVariant: item.isVariant,
        href: `/seller/${params.sellerId}/manage-products/${item.id}`,
        tags: item.tags.join(", "),
        price: isThereAPrice
          ? `₱${item.price?.toFixed(2) ?? "0.00"}`
          : priceWithVariants,
      };
    }) || [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-2xl">{seller?.businessType === "Service" ? "Service" : "Product"} Dashboard</p>
        <Button>
          <Link href={`/seller/${params.sellerId}/manage-products/create`}>
            + Add {seller?.businessType === "Service" ? "Service" : "Product"}
          </Link>
        </Button>
      </div>
      <ProductClient data={formattedData} />
    </div>
  );
};

export default SellerProducts;
