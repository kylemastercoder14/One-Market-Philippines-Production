import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductCard from "@/components/globals/product-card";
import db from "@/lib/db";

const FlashDealsSection = async () => {
  const products = await db.sellerProduct.findMany({
    take: 10,
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
    <div className="mt-5">
      <Carousel className="w-full max-w-full">
        <CarouselContent className="-ml-1">
          {products.map((product) => {
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
              <CarouselItem
                key={product.id}
                className="pl-1 md:basis-1/2 lg:basis-1/5"
              >
                <ProductCard
                  href={`/${product.slug}`}
                  title={product.name}
                  image={product.images[0]}
                  originalPrice={
                    isThereAPrice
                      ? `₱${product.price?.toFixed(2) ?? "0.00"}`
                      : priceWithVariants
                  }
                  sold={28}
                  ratingCount={5}
                  seller={product.seller}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default FlashDealsSection;
