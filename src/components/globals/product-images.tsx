"use client";

import Image from "next/image";
import React from "react";

const ProductImages = ({ images }: { images: string[] }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <div className="relative grid grid-cols-10 gap-2">
      {/* Thumbnail Images */}
      <div className="flex flex-col gap-2 col-span-1">
        {images.map((image, index) => (
          <div
            key={index}
            onMouseEnter={() => setSelectedIndex(index)} // Change image on hover
            className={`cursor-pointer md:h-20 h-14 w-full relative gap-4 ${
              selectedIndex === index ? "border-2 border-black" : ""
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        ))}
      </div>

      {/* Main Selected Image */}
      <div className="md:h-[700px] h-[500px] col-span-9 relative">
        <Image
          src={images[selectedIndex]}
          alt="Selected Image"
          fill
          className="object-cover"
          sizes="50vw"
        />
      </div>
    </div>
  );
};

export default ProductImages;
