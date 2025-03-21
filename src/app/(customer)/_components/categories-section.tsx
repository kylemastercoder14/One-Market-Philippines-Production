import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CategoriesCard from "@/components/globals/categories-card";
import db from "@/lib/db";
import Image from "next/image";

const CategoriesSection = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      seller: true,
    },
  });
  return (
    <div className="mt-5">
      {categories.length > 0 ? (
        <Carousel className="w-full max-w-full">
          <CarouselContent className="-ml-1">
            {categories.map((category) => (
              <CategoriesCard
                key={category.id}
                title={category.name}
                storeCount={category.seller.length}
                image={category.image as string}
              />
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <Image
            src="/images/empty-item.svg"
            alt="Empty"
            width={200}
            height={200}
          />
          <p className="font-semibold mb-1">No categories yet.</p>
          <p className="text-muted-foreground text-sm">
            Please check back later for more updates.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoriesSection;
