import React from "react";
import HeadingAction from "@/components/ui/heading-action";
import ProductDiscountForm from "@/components/forms/discount-form";
import db from "@/lib/db";

const DiscountId = async (props: {
  params: Promise<{
    discountId: string;
    sellerId: string;
  }>;
}) => {
  const params = await props.params;
  const discounts = await db.sellerDiscount.findUnique({
    where: {
      id: params.discountId,
    },
    include: {
      products: true
    }
  });
  const products = await db.sellerProduct.findMany({
    where: {
      sellerId: params.sellerId,
    },
    orderBy: {
      name: "asc",
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
    include: {
      category: {
        include: {
          sellerSubCategory: true,
        }
      }
    }
  })

  const categories = seller?.category?.sellerSubCategory ?? [];

  return (
    <div>
      <HeadingAction
        className="w-80"
        title={
          discounts ? `Edit product discount` : "Create new product discount"
        }
        link={`/seller/${params.sellerId}/promotions/discounts`}
      />
      <p className="text-sm text-muted-foreground mt-2">
        {discounts
          ? "Modify the existing product discount details, type, promotion period, and other relevant information."
          : "Fill in the product discount details, including type, and promotion period, to create a new product discount."}
      </p>
      <ProductDiscountForm
        products={products}
        initialData={discounts}
        sellerId={params.sellerId}
        categories={categories}
      />
    </div>
  );
};

export default DiscountId;
