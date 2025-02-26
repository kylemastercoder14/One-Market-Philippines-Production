"use client";

import { Loader2, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { searchProducts } from "@/actions/product";
import { SellerProduct } from "@prisma/client";
import { useRouter } from 'next/navigation';

const SearchContainer = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<SellerProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSuggestions(debouncedSearchTerm);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm]);

  const fetchSuggestions = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await searchProducts(query);
      if (!Array.isArray(response)) {
        console.error("Error fetching suggestions:", response.error);
        setSuggestions([]);
      } else {
        setSuggestions(response);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="bg-white border-2 border-black w-[300px] h-[40px] rounded-full flex items-center justify-between pr-1 pl-5 mr-3">
        <input
          type="text"
          className="bg-transparent border-none outline-none text-sm w-full"
          placeholder="Search anything here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-zinc-900 rounded-full py-2 px-4">
          <Search className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Search Suggestions */}
      {(isLoading || searchTerm) && (
        <div className="absolute top-12 left-0 w-full bg-white border border-gray-300 shadow-md rounded-lg max-h-[200px] overflow-y-auto">
          {isLoading ? (
            <div className="p-3 text-sm text-gray-500 text-center flex items-center justify-center">
              <Loader2 className="animate-spin size-5" />
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map((product) => (
              <div
                key={product.id}
                onClick={() => router.push(`/${product.slug}`)}
                className="p-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
              >
                <span className="text-sm line-clamp-1">{product.name}</span>
              </div>
            ))
          ) : (
            <p className="p-3 text-sm text-gray-500 text-center">No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchContainer;
