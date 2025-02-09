import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import StoreCard from "@/components/globals/store-card";
import db from "@/lib/db";
import Image from "next/image";

const FeaturedStore = async () => {
  const stores = await db.seller.findMany({
    where: {
      isPremium: true,
    },
  });
  return (
    <div className="mt-5">
      {stores.length > 0 ? (
        <Carousel className="w-full max-w-full">
          <CarouselContent className="-ml-1">
            {stores.map((store) => (
              <StoreCard
                key={store.id}
                storeName={store.name || "Store Name"}
                image={store.bir || "/profile.jpg"}
                sold={5}
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
          <p className="font-semibold mb-1">No featured store yet.</p>
          <p className="text-muted-foreground text-sm">
            Please check back later for more updates.
          </p>
        </div>
      )}
    </div>
  );
};

export default FeaturedStore;
