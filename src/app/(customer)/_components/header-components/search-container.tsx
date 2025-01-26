"use client";

import { Search } from "lucide-react";
import React from "react";

const SearchContainer = () => {
  return (
    <div className="bg-white border-2 border-black w-[300px] h-[40px] rounded-full flex items-center justify-between pr-1 pl-5 mr-3">
      <input
        type="text"
        className="bg-transparent border-none outline-none text-sm"
        placeholder="Search anything here..."
      />
      <button className="bg-zinc-900 rounded-full py-2 px-4">
        <Search className="w-4 h-4 text-white" />
      </button>
    </div>
  );
};

export default SearchContainer;
