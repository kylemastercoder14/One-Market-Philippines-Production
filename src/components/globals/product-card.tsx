/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as Star } from "@heroicons/react/24/outline";
import { formatTime } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Seller } from "@prisma/client";
import { ChevronRight } from 'lucide-react';

const ProductCard = ({
  title,
  image,
  originalPrice,
  sold,
  ratingCount,
  time,
  className,
  href,
  seller,
  productLength,
}: {
  title: string;
  image: string;
  originalPrice: string;
  sold?: number;
  ratingCount?: number;
  time?: number;
  initialCountdown?: number;
  className?: string;
  href: string;
  seller: Seller | null;
  productLength?: number;
}) => {
  const router = useRouter();
  const initialCountdown = 7 * 3600 + 19 * 60 + 26;
  const [timers, setTimers] = useState<number[]>(
    Array.from({ length: productLength ?? 0 }, () => initialCountdown)
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
    <div className="p-1 cursor-pointer" onClick={() => router.push(href)}>
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
            <p className="line-clamp-1 text-sm mb-1">{title}</p>
            <Link
              className="flex text-sm items-center gap-1"
              href={`/admin/sellers/${seller?.id}`}
            >
              Sold by:{" "}
              <div className="text-red-800 flex items-center gap-2 hover:underline">
                <Avatar className='w-5 h-5'>
                  <AvatarImage src={seller?.image || ""} className='object-cover' />
                  <AvatarFallback>{seller?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                {seller?.name}
              </div>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <p className="text-red-700 font-semibold">{originalPrice}</p>
              {sold && <p>{sold}+ sold</p>}
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
