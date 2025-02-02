
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
        title={products ? `Edit Product` : "Add Product"}
        link={`/seller/${params.sellerId}/manage-products`}
      />
      <p className="text-sm text-muted-foreground mt-2">
        {products
          ? "Modify the existing product details, update pricing, descriptions, and other relevant information."
          : "Fill in the product details, including name, category, price, and description, to add a new product to your store."}
      </p>

      {businessType === "NonFood" && (
        <NonFoodProductForm
          subCategories={seller?.category?.sellerSubCategory || []}
          sellerId={params.sellerId}
          initialData={products}
        />
      )}
      {businessType === "Food" && <FoodProductForm />}
      {businessType === "Service" && <ServiceProductForm />}
    </div>
  );
};

export default ProductId;
