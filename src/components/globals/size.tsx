"use client";

import React from "react";

interface SizeOption {
  id: string;
  name: string;
  image?: string | null;
  price?: number | null;
}

interface SizeProps {
  data: SizeOption[];
  onSelect: (option: SizeOption) => void;
}

const Size: React.FC<SizeProps> = ({ data, onSelect }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  if (data.length === 0) {
    return <p>No sizes available.</p>;
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
          className={`cursor-pointer rounded-full text-center h-10 p-2 w-20 text-sm relative gap-4 ${
            selectedIndex === index ? "border-2 border-black" : "border"
          }`}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default Size;
