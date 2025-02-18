"use client";

import React, { useState } from "react";
import ProductImages from "@/components/globals/product-images";
import Link from "next/link";
import { ChevronRight, Minus, Plus } from "lucide-react";
import Color from "@/components/globals/color";
import Size from "@/components/globals/size";
import { Button } from "@/components/ui/button";
import {
  Seller,
  SellerProduct,
  SellerProductVariantsOptions,
} from "@prisma/client";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as Star } from "@heroicons/react/24/outline";
import Preview from "@/components/globals/preview";
import ReviewsBanner from "@/components/globals/reviews-banner";
import ReviewCard from "@/components/globals/review-card";
import useCart from "@/hooks/use-cart";
import FullCalendarComponent from '@/components/globals/full-calendar-component';

interface ProductsSingleClientPropsVariants extends ProductsSingleClientProps {
  sellerProductVariantsOptions: SellerProductVariantsOptions[];
}

interface ProductsSingleClientProps extends SellerProduct {
  seller: Seller | null;
  sellerProductVariants: ProductsSingleClientPropsVariants[];
}

interface SimplifiedOption {
  name: string;
  price?: number | null;
  image?: string | null;
}

const ProductSingleClient = ({
  product,
}: {
  product: ProductsSingleClientProps | null;
}) => {
  const addToCart = useCart((state) => state.addItem);
  const [selectedColor, setSelectedColor] = useState<SimplifiedOption | null>(
    null
  );
  const [selectedSize, setSelectedSize] = useState<SimplifiedOption | null>(
    null
  );

  const [quantity, setQuantity] = useState(1);

  // Flatten all options to find the minimum price but exclude the zero prices
  const lowestPrice = product?.sellerProductVariants.reduce((acc, variant) => {
    const price = variant.sellerProductVariantsOptions.reduce((acc, option) => {
      if (option.price === 0) {
        return acc;
      }
      return option.price !== null ? Math.min(acc, option.price) : acc;
    }, Infinity);
    return Math.min(acc, price);
  }, Infinity);

  // Determine the displayed price
  const displayedPrice =
    selectedColor?.price !== null && selectedColor?.price !== undefined
      ? selectedColor.price
      : selectedSize?.price !== null && selectedSize?.price !== undefined
        ? selectedSize.price
        : product?.price || null;

  const isThereAPrice = displayedPrice !== null && displayedPrice !== 0;
  const priceWithVariants =
    lowestPrice !== Infinity
      ? `Starts at ₱${lowestPrice?.toFixed(2)}`
      : "Price unavailable";

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleAddToCart = () => {
    addToCart({
      id: product?.id as string,
      name: product?.name as string,
      price: Number(displayedPrice?.toFixed(2)) ?? 0,
      quantity,
      image: product?.images[0] as string,
      variant: `${selectedColor?.name ?? ""} (${selectedSize?.name ?? ""})`,
    });
  };
  return (
    <>
      <div className="relative flex flex-col md:flex-row gap-16 mt-5">
        {/* IMAGES */}
        <div className="w-full lg:w-1/2 overflow-y-auto md:max-h-[100vh] no-scrollbar">
          <ProductImages images={product?.images || []} />
          <div className="mt-5">
            <p className="font-semibold md:w-[700px] w-full md:truncate">
              Product details of {product?.name}
            </p>
            <div className="flex items-center mt-2 gap-2">
              {product?.tags.map((tag, index) => (
                <div
                  className="bg-black/80 text-white rounded-md text-xs px-2 py-1"
                  key={index}
                >
                  {tag}
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-2 mt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Brand:</p>
                  <p>{product?.brand || "N/A"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Weight:</p>
                  <p>{product?.weight || "N/A"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Height:</p>
                  <p>{product?.height || "N/A"}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">SKU:</p>
                  <p>{product?.sku || "N/A"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Materials:</p>
                  <p>{product?.materials.join(", ") || "N/A"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Warranty Period:</p>
                  <p>{product?.warrantyPeriod || "N/A"}</p>
                </div>
              </div>
            </div>
            <p className="mt-3">
              <Preview value={product?.description as string} />
            </p>
            <div className="flex w-full justify-between mt-2 items-center">
              <div className="flex items-center gap-3">
                <h1>516 reviews</h1>
                <p className="text-muted-foreground">|</p>
                <div className="flex items-center gap-2">
                  <p>4.7</p>
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4" />
                    <StarIcon className="w-4 h-4" />
                    <StarIcon className="w-4 h-4" />
                    <StarIcon className="w-4 h-4" />
                    <Star className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <ReviewsBanner />
            </div>
            <div className="mt-5 space-y-3">
              <ReviewCard />
            </div>
          </div>
        </div>
        {/* CONTENT */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h3>{product?.name}</h3>
          <div className="text-sm mt-2 flex items-center gap-2">
            <Link href="#">
              Sold by:{" "}
              <span className="text-red-800 hover:underline">
                {product?.seller?.name}
              </span>
            </Link>
            <ChevronRight className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-3 text-lg mt-3">
            <p className="text-red-800 font-semibold">
              {isThereAPrice
                ? `₱${displayedPrice?.toFixed(2) ?? "0.00"}`
                : priceWithVariants}
            </p>
            <p>{189}+ sold</p>
          </div>
          {product?.seller?.businessType === "Service" ? (
            <FullCalendarComponent />
          ) : (
            <>
              <div className="mt-5">
                {product?.sellerProductVariants.find(
                  (variant) => variant.name === "Color"
                ) && (
                  <>
                    <p className="font-semibold mt-5">Color: </p>
                    <div className="flex items-center gap-2">
                      <Color
                        data={
                          product?.sellerProductVariants
                            .find((variant) => variant.name === "Color")
                            ?.sellerProductVariantsOptions.map((option) => ({
                              ...option,
                              name: option.name,
                              image: option.image,
                              price: option.price,
                            })) || []
                        }
                        onSelect={(option) => setSelectedColor(option)}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="mt-5">
                {product?.sellerProductVariants.find(
                  (variant) => variant.name === "Size"
                ) && (
                  <>
                    <p className="font-semibold mt-5">Size: </p>
                    <div className="flex items-center gap-2">
                      <Size
                        data={
                          product?.sellerProductVariants
                            .find((variant) => variant.name === "Size")
                            ?.sellerProductVariantsOptions.map((option) => ({
                              ...option,
                              name: option.name,
                              image: option.image,
                              price: option.price,
                            })) || []
                        }
                        onSelect={(option) => setSelectedSize(option)}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="mt-5">
                {product?.sellerProductVariants.find(
                  (variant) => variant.name === "Flavor"
                ) && (
                  <>
                    <p className="font-semibold mt-5">Flavor: </p>
                    <div className="flex items-center gap-2">
                      <Color
                        data={
                          product?.sellerProductVariants
                            .find((variant) => variant.name === "Flavor")
                            ?.sellerProductVariantsOptions.map((option) => ({
                              ...option,
                              name: option.name,
                              image: option.image,
                              price: option.price,
                            })) || []
                        }
                        onSelect={(option) => setSelectedSize(option)}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center gap-3 mt-5">
                <p className="font-semibold">Qty:</p>
                <div className="border flex justify-center items-center gap-3 py-2 w-24">
                  <Minus
                    onClick={handleDecrement}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <input
                    type="text"
                    className="w-5 text-sm text-center bg-white border-0 outline-none"
                    placeholder="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                  <Plus
                    onClick={handleIncrement}
                    className="w-4 h-4 cursor-pointer"
                  />
                </div>
              </div>
              <div className="mt-5">
                <p className="text-[#0A8800] font-semibold">Shipping: TBA</p>
                <p className="mt-3 text-sm">
                  Delivery: 10-30 minuted depending on the location
                </p>
                <p className="mt-1 text-sm">
                  <strong>Courier</strong>: We aim to support tricycle drivers,
                  pedicab drivers, and cyclists by offering them opportunities
                  to serve as couriers, providing them with an additional source
                  of income.
                </p>
              </div>
            </>
          )}
          {product?.seller?.businessType === "Service" ? (
            <Button
              size="lg"
              className="rounded-full h-12 mt-5"
            >
              Book appointment &rarr;
            </Button>
          ) : (
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="rounded-full h-12 mt-5"
            >
              Add to cart &rarr;
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductSingleClient;
