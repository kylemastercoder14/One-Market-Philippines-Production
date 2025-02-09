"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as Star } from "@heroicons/react/24/outline";
import { formatTime } from "@/lib/utils";
import { useRouter } from "next/navigation";

const ProductCard = ({
  title,
  image,
  price,
  originalPrice,
  slug,
  sold,
  discount,
  ratingCount,
  time,
  className,
}: {
  title: string;
  image: string;
  price: number;
  slug: string;
  originalPrice: number;
  sold?: number;
  discount: number;
  ratingCount?: number;
  time?: number;
  initialCountdown?: number;
  className?: string;
}) => {
  const router = useRouter();
  return (
    <div className="p-1 cursor-pointer" onClick={() => router.push(`/${slug}`)}>
      <Card className="border-0 shadow-none">
        <CardContent className="p-0">
          <div
            className={`relative group overflow-hidden w-full h-[250px] ${className}`}
          >
            <Image
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              fill
              src={image}
              alt="Sample"
            />
          </div>
          <div className="py-4">
            <p className="line-clamp-2 text-sm mb-2">{title}</p>
            <div className="flex items-center gap-2 text-sm">
              <p className="text-red-700 font-semibold">₱{price}</p>
              <p className="text-muted-foreground line-through">
                ₱{originalPrice}
              </p>
              {sold && <p>{sold}+ sold</p>}
              <div className="border border-red-700 px-1.5 py-0.5 rounded-md text-red-700 text-xs">
                -{discount}%
              </div>
            </div>
            {time && (
              <div className="flex items-center space-x-2 mt-2">
                <div className="relative w-40 h-1 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-black"
                    style={{
                      width: `${40}%`,
                    }}
                  ></div>
                </div>
                <div className="flex items-center space-x-1 text-sm font-medium text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6l4 2m-4-8a9 9 0 100 18 9 9 0 000-18z"
                    />
                  </svg>
                  <span>{time ? formatTime(time) : ""}</span>
                </div>
              </div>
            )}
            {ratingCount && (
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <StarIcon className="w-4 h-4" />
                  <StarIcon className="w-4 h-4" />
                  <StarIcon className="w-4 h-4" />
                  <StarIcon className="w-4 h-4" />
                  <Star className="w-4 h-4" />
                </div>
                <span className="text-sm text-muted-foreground">
                  {ratingCount}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
