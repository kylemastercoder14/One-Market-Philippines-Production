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
import ProductCard from "@/components/globals/product-card";
import Image from "next/image";

const CategorySlug = async (props: {
  params: Promise<{
    categorySlug: string;
  }>;
}) => {
  const params = await props.params;
  const decodedSlug = decodeURIComponent(params.categorySlug);
  const products = await db.sellerProduct.findMany({
    where: {
      category: decodedSlug,
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

  const category = await db.subCategory.findFirst({
    where: {
      slug: decodedSlug.toLowerCase(),
    },
    include: {
      category: true,
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
            <BreadcrumbLink
              href={`/type/${category?.category?.slug}`}
              className="capitalize"
            >
              {category?.category?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize">
              {decodedSlug.replace(/-/g, " ")}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-10">
        <div className="grid md:grid-cols-5 grid-cols-1 gap-5 mt-3">
          {products.length > 0 ? (
            products.map((product) => {
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

              const isThereAPrice =
                product.price !== null && product.price !== 0;
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
            })
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <Image
                src="/images/empty-item.svg"
                alt="Empty"
                width={200}
                height={200}
              />
              <p className="font-semibold mb-1">
                No products found in this category.
              </p>
              <p className="text-muted-foreground text-sm">
                Please check back later for more updates.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySlug;
