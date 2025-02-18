import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import db from "@/lib/db";
import ProductSingleClient from "../_components/product-single-client";
import HeaderDesign from "@/components/globals/header-design";
import ProductCard from "@/components/globals/product-card";

const ProductSlug = async (props: {
  params: Promise<{
    productSlug: string;
  }>;
}) => {
  const params = await props.params;
  const decodedSlug = decodeURIComponent(params.productSlug);
  const product = await db.sellerProduct.findUnique({
    where: {
      slug: decodedSlug,
    },
    include: {
      seller: true,
      sellerProductVariants: {
        include: {
          sellerProductVariantsOptions: true,
        },
      },
    },
  });

  const relatedProducts = await db.sellerProduct.findMany({
    where: {
      sellerId: product?.sellerId,
    },
    include: {
      seller: true,
      sellerProductVariants: {
        include: {
          sellerProductVariantsOptions: true,
        },
      },
    },
  });
  return (
    <div className="md:px-[200px] px-10 pb-20 pt-24">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/type/${product?.seller?.categorySlug}`} className="capitalize">
              {product?.seller?.categorySlug?.replace(/-/g, " ") ||
                "Unknown Category"}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/category/${product?.category}`}>{product?.category}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {product?.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ProductSingleClient product={product} seller={product?.seller} />
      <div className="mt-10">
        <div className="flex items-center gap-4">
          <HeaderDesign />
          <h3 className="text-red-800 font-black text-2xl font-costaBold">
            Related Products From Store {product?.seller.name}
          </h3>
          <HeaderDesign />
        </div>
        <div className="grid md:grid-cols-5 grid-cols-1 gap-5 mt-3">
          {relatedProducts.map((product) => {
            const lowestPrice = product.sellerProductVariants.reduce(
              (acc, variant) => {
                const price = variant.sellerProductVariantsOptions.reduce(
                  (acc, option) => {
                    if (option.price === 0) {
                      return acc;
                    }

                    return option.price !== null
                      ? Math.min(acc, option.price)
                      : acc;
                  },
                  Infinity
                );

                return Math.min(acc, price);
              },
              Infinity
            );

            const isThereAPrice = product.price !== null && product.price !== 0;
            const priceWithVariants =
              lowestPrice !== Infinity
                ? `Starts at ₱${lowestPrice.toFixed(2)}`
                : "Price unavailable";
            return (
              <ProductCard
                href={`/${product.slug}`}
                key={product.id}
                title={product.name}
                image={product.images[0]}
                originalPrice={
                  isThereAPrice
                    ? `₱${product.price?.toFixed(2) ?? "0.00"}`
                    : priceWithVariants
                }
                sold={12}
                ratingCount={5}
                seller={product.seller}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductSlug;
