"use client";

import {
  Seller,
  SellerProduct,
  SellerProductVariants,
  SellerProductVariantsOptions,
} from "@prisma/client";
import React, { useState } from "react";
import ProductImages from "@/components/globals/product-images";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Color from "@/components/globals/color";
import Size from "@/components/globals/size";
import Preview from "@/components/globals/preview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProductVariantProps extends SellerProductVariants {
  sellerProductVariantsOptions: SellerProductVariantsOptions[];
}

interface ProductProps extends SellerProduct {
  sellerProductVariants: ProductVariantProps[];
}

interface SimplifiedOption {
  name: string;
  price?: number | null;
  image?: string | null;
}

const ProductIdClient = ({
  product,
  seller,
}: {
  product: ProductProps | null;
  seller: Seller | null;
}) => {
  const [selectedColor, setSelectedColor] = useState<SimplifiedOption | null>(
    null
  );
  const [selectedSize, setSelectedSize] = useState<SimplifiedOption | null>(
    null
  );

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

  return (
    <div className="relative flex flex-col md:flex-row gap-16 mt-5">
      {/* IMAGES */}
      <div className="w-full lg:w-1/2">
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
            <Preview value={product?.description || ""} />
          </p>
        </div>
      </div>
      {/* CONTENT */}
      <div className="w-full md:w-1/2 flex flex-col">
        <h3>{product?.name}</h3>
        <div className="text-sm mt-2 flex items-center gap-2">
          <Link
            className="flex items-center gap-2"
            href={`/admin/sellers/${seller?.id}`}
          >
            Sold by:{" "}
            <div className="text-orange-600 flex items-center gap-2 hover:underline">
              <Avatar>
                <AvatarImage src={seller?.image || ""} />
                <AvatarFallback>{seller?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              {seller?.name}
            </div>
          </Link>
          <ChevronRight className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-3 text-lg mt-3">
          <p className="text-orange-600 font-semibold">
            {isThereAPrice
              ? `₱${displayedPrice?.toFixed(2) ?? "0.00"}`
              : priceWithVariants}
          </p>
          <p>{12}+ sold</p>
        </div>
        <div className="mt-2">
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
      </div>
    </div>
  );
};

export default ProductIdClient;
