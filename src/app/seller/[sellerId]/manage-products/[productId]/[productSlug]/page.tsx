import React from "react";
import VariantForm from "./variant-form";
import db from '@/lib/db';

const ProductVariant = async (props: {
  params: Promise<{
    productSlug: string;
    sellerId: string;
  }>;
}) => {
  const params = await props.params;
  const formattedSlug = decodeURIComponent(params.productSlug);
  const variants = await db.sellerProductVariants.findMany({
    where: {
      sellerProductSlug: formattedSlug
    },
    include: {
      sellerProductVariantsOptions: true
    }
  })
  return (
    <div>
      <VariantForm initialVariants={variants} productSlug={formattedSlug} />
    </div>
  );
};

export default ProductVariant;
