"use client";

import React from "react";
import { CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const StoreCard = ({
  storeName,
  image,
  sold,
}: {
  storeName: string;
  image: string;
  sold: number;
}) => {
  return (
    <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/4">
      <div className="p-1">
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <Avatar className="w-40 h-40">
              <AvatarImage src={image} className='object-cover' />
              <AvatarFallback>{storeName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="py-4">
              <p className="line-clamp-2 text-sm">{storeName}</p>
              <p className="text-sm text-muted-foreground">{sold}+ sold</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
};

export default StoreCard;
