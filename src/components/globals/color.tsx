"use client";

import Image from "next/image";
import React from "react";

interface ColorOption {
  id: string;
  name: string;
  image?: string | null;
  price?: number | null;
}

interface ColorProps {
  data: ColorOption[];
  onSelect: (option: ColorOption) => void;
}

const Color: React.FC<ColorProps> = ({ data, onSelect }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  if (data.length === 0) {
    return <p>No colors available.</p>;
  }

  return (
    <div className="flex items-center gap-3 mt-2">
      {data.map((item, index) => (
        <div
          key={item.id}
          onClick={() => {
            setSelectedIndex(index);
            onSelect(item);
          }}
          className={`cursor-pointer h-36 p-2 w-28 relative gap-4 ${
            selectedIndex === index ? "border-2 border-black" : "border"
          }`}
          role="button"
          aria-label={`Select color ${item.name}`}
        >
          <Image
            src={item.image || "/placeholder-color.png"}
            alt={`Thumbnail ${index + 1}`}
            fill
            className="object-contain"
            sizes="30vw"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-color.png";
            }}
          />
          <div className="text-center bg-orange-400/40 bottom-1.5 px-1 py-0.5 rounded-md absolute mt-2 font-semibold text-xs">
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Color;
