import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductsGrid from "../_components/products-grid";
import { ChevronDown } from "lucide-react";
import db from "@/lib/db";

const BestSellers = async () => {
  const categories = await db.category.findMany();
  return (
    <main className="px-[200px] pb-20 pt-28">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="font-semibold text-lg">Best Sellers</p>
          <Button variant="outline" className="border-black rounded-full">
            Within last 30 days
          </Button>
          <Button variant="outline" className="rounded-full">
            Within last 14 days
          </Button>
          <Button variant="outline" className="rounded-full">
            Within last 7 days
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-muted-foreground">Filter by category</p>
          <Select>
            <SelectTrigger className="w-[280px] border-black rounded-full">
              <SelectValue placeholder="Recommended" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
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

export default BestSellers;
