"use client";

import React from "react";
import { CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const CategoriesCard = ({
  title,
  storeCount,
  image,
}: {
  title: string;
  storeCount: number;
  image: string;
}) => {
  return (
    <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/5">
      <div className="p-1">
        <Card className="border-0 shadow-none">
          <CardContent>
            <div className="relative size-28">
              <Image
                src={image}
                alt={title}
                className="w-full h-full rounded-full object-cover"
                fill
              />
              <div className="absolute bottom-0 right-0 bg-black/60 px-2 py-1 rounded-full text-white text-sm">
                {storeCount} stores
              </div>
            </div>
            <div className="py-4">
              <p className="line-clamp-1 text-sm text-center text-black font-semibold">
                {title}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
};

export default CategoriesCard;
