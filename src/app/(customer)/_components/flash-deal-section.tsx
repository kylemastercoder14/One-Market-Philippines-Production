"use client";

import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductCard from "@/components/globals/product-card";

const data = [
  {
    title:
      "Women's Starry Night Graphic Tee - Casual Black Crew Neck Short Sleeve Top, 100% Polyester, Machine Washable, Perfect for Summer & Spring, Ladies T Shirts",
    image: "/sample-3.webp",
    slug: "womens-starry-night-graphic-tee",
    price: 390,
    originalPrice: 500,
    sold: 3290,
    discount: 78,
    rating: 4.5,
    ratingCount: 212,
  },
  {
    title:
      "Large Realistic Money Grass Leaf Plant - 18 Large Leaves, Wide Leaf Plant Decoration",
    slug: "large-realistic-money-grass-leaf-plant",
    image: "/sample-2.webp",
    price: 128,
    originalPrice: 200,
    sold: 1290,
    discount: 36,
    rating: 5,
    ratingCount: 290,
  },
  {
    title:
      "Solar System for SATURN 3D Laser-Engraved Crystal Ball Night Light - USB Powered",
    slug: "solar-system-for-saturn-3d-laser-engraved-crystal-ball-night-light",
    image: "/sample-4.jpg",
    price: 299,
    originalPrice: 500,
    sold: 120,
    discount: 40,
    rating: 4,
    ratingCount: 67,
  },
  {
    title:
      "12pcs/pack Thickened Bedroom Living Room Full Town Splicing Carpet Rug, Room Bedside Blanket Warm",
    slug: "12pcs-pack-thickened-bedroom-living-room-full-town-splicing-carpet-rug",
    image: "/sample-5.webp",
    price: 467,
    originalPrice: 800,
    sold: 5209,
    discount: 42,
    rating: 5,
    ratingCount: 902,
  },
  {
    title:
      "[10 to 100pcs] 3-Ply Disposable Face Mask - 3 Layers of Protection, Comfortable Earloop, Breathable, Dustproof, Anti-Droplets, Anti-Pollen, Anti-Fog",
    slug: "10-to-100pcs-3-ply-disposable-face-mask",
    image: "/sample-image.webp",
    price: 230,
    originalPrice: 328,
    sold: 833,
    discount: 30,
    rating: 4.5,
    ratingCount: 402,
  },
];

const FlashDealsSection = () => {
  const initialCountdown = 7 * 3600 + 19 * 60 + 26; // Initial countdown in seconds (7h:19m:26s)
  const [timers, setTimers] = useState<number[]>(
    Array.from({ length: data.length }, () => initialCountdown)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((time) => (time > 0 ? time - 1 : 0))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-5">
      <Carousel className="w-full max-w-full">
        <CarouselContent className="-ml-1">
          {data.map((product, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/5"
            >
              <ProductCard
                href="/product/slug"
                slug={product.slug}
                title={product.title}
                image={product.image}
                originalPrice={product.originalPrice}
                sold={product.sold}
                ratingCount={product.ratingCount}
                time={timers[index]}
                initialCountdown={initialCountdown}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default FlashDealsSection;
