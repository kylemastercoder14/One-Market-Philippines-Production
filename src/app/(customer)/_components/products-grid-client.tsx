"use client";

import React, { useState } from "react";
import ProductCard from "@/components/globals/product-card";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Seller,
  SellerProduct,
  SellerProductVariantsOptions,
  SubCategory,
} from "@prisma/client";

interface ProductsGridClientPropsVariants extends ProductsGridClientProps {
  sellerProductVariantsOptions: SellerProductVariantsOptions[];
}

interface ProductsGridClientProps extends SellerProduct {
  sellerProductVariants: ProductsGridClientPropsVariants[];
  seller: Seller | null;
}

const ProductsGridClient = ({
  products,
  categories,
}: {
  categories: SubCategory[];
  products: ProductsGridClientProps[];
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;
  return (
    <>
      <div className="mt-5">
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            <CarouselItem className="pl-1 md:basis-1/2 lg:basis-[15%]">
              <div className="p-1">
                <Card
                  onClick={() => setSelectedCategory(null)}
                  className={`rounded-full cursor-pointer ${
                    !selectedCategory ? "bg-[#8D021F] text-white" : ""
                  }`}
                >
                  <CardContent className="text-sm p-0">
                    <div className="flex items-center text-center justify-center p-3">
                      All
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            {categories.map((category) => (
              <CarouselItem
                className="pl-1 md:basis-1/2 lg:basis-[15%]"
                key={category.id}
              >
                <div className="p-1">
                  <Card
                    onClick={() => setSelectedCategory(category.name)}
                    className={`rounded-full cursor-pointer ${
                      selectedCategory === category.name
                        ? "bg-[#8D021F] text-white"
                        : ""
                    }`}
                  >
                    <CardContent className="text-sm p-0">
                      <div className="flex items-center text-center justify-center p-3">
                        {category.name}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="mt-10 grid md:grid-cols-5 grid-cols-1 gap-5">
        {filteredProducts.map((product) => {
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
    </>
  );
};

export default ProductsGridClient;
