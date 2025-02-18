"use client";

import React from "react";
import { CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const CategoriesCard = ({
  title,
  storeCount,
}: {
  title: string;
  storeCount: number;
}) => {
  return (
    <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/4">
      <div className="p-1">
        <Card className="border-0 shadow-none">
          <CardContent className="p-2 relative bg-gradient-to-b from-red-400 via-red-700 to-red-800 min-h-[160px] rounded-xl flex items-center justify-center">
            <div className="absolute bottom-0 right-0 bg-black/60 px-2 py-1 rounded-full text-white text-sm">
              {storeCount} stores
            </div>
            <div className="py-4">
              <p className="line-clamp-2 text-sm text-center text-white font-semibold">
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
