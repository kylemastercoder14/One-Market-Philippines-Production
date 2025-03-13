import { Search } from "lucide-react";
import React from "react";

const MobileSearch = () => {
  return (
    <div className="flex relative w-full border rounded-full bg-slate-100 py-2 px-3 items-center">
      <Search className="w-4 h-4" />
      <input
        className="bg-transparent border-none outline-none text-sm pl-2"
        placeholder="Search anything here..."
      />
    </div>
  );
};

export default MobileSearch;
