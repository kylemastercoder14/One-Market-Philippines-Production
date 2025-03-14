import React from "react";
import HeadingAction from "@/components/ui/heading-action";
import db from "@/lib/db";
import NonFoodProductForm from "./_components/non-food-product";
import FoodProductForm from "./_components/food-product";
import ServiceProductForm from "./_components/service-product";

const ProductId = async (props: {
  params: Promise<{
    productId: string;
    sellerId: string;
  }>;
}) => {
  const params = await props.params;
  const seller = await db.seller.findUnique({
    where: {
      id: params.sellerId,
    },
    include: {
      category: {
        include: {
          sellerSubCategory: true,
        },
      },
    },
  });
  const products = await db.sellerProduct.findUnique({
    where: {
      id: params.productId,
    },
  });

  const businessType = seller?.businessType;

  return (
    <div>
      <HeadingAction
        className="w-40"
        title={
          products
            ? `Edit ${businessType === "Service" ? "Service" : "Product"}`
            : `Add ${businessType === "Service" ? "Service" : "Product"}`
        }
        link={`/seller/${params.sellerId}/manage-products`}
      />
      <p className="text-sm text-muted-foreground mt-2">
        {products
          ? `Modify the existing ${businessType === "Service" ? "service" : "product"} details, update pricing, descriptions, and other relevant information.`
          : `Fill in the ${businessType === "Service" ? "service" : "product"} details, including name, category, price, and description, to add a new ${businessType === "Service" ? "service" : "product"} to your store.`}
      </p>

      {businessType === "NonFood" && (
        <NonFoodProductForm
          subCategories={seller?.category?.sellerSubCategory || []}
          seller={seller}
          initialData={products}
        />
      )}
      {businessType === "Food" && (
        <FoodProductForm
          subCategories={seller?.category?.sellerSubCategory || []}
          seller={seller}
          initialData={products}
        />
      )}
      {businessType === "Service" && (
        <ServiceProductForm
          subCategories={seller?.category?.sellerSubCategory || []}
          seller={params.sellerId}
          initialData={products}
        />
      )}
    </div>
  );
};

export default ProductId;
