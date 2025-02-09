import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="relative mt-20 w-full bg-[#8D021F] h-[30vh]">
      <Image
        src="/banner.webp"
        alt="Banner"
        fill
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Banner;
