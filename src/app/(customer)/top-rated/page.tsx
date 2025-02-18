import React from "react";
import { Button } from "@/components/ui/button";
import ProductsGrid from "../_components/products-grid";
import { ChevronDown } from 'lucide-react';

const TopRated = () => {
  return (
    <main className="px-[200px] pb-20 pt-28">
      <ProductsGrid />
      <Button
        size="lg"
        className="mt-5 w-[200px] text-lg rounded-full font-bold flex items-center text-center justify-center mx-auto"
      >
        See More <ChevronDown className="w-5 h-5" />
      </Button>
    </main>
  );
};

export default TopRated;
