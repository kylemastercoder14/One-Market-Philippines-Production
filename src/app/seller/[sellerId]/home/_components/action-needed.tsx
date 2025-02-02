"use client";

import { ChevronRight } from "lucide-react";
import React from "react";

const ActionNeeded = ({
  productCount,
  orderCount,
  outOfStockCount,
  returnCount,
}: {
  productCount: number;
  orderCount: number;
  outOfStockCount: number;
  returnCount: number;
}) => {
  return (
    <div className="w-full border bg-white rounded-md shadow-md p-5 mt-5">
      <h1 className="text-2xl font-semibold mb-4">Action Needed</h1>
      <div className="grid md:grid-cols-4 grid-cols-1">
        <div>
          <div className="flex items-center text-muted-foreground gap-2">
            <p className="text-lg">Total Products</p>
            <ChevronRight className="w-5 h-5 cursor-pointer" />
          </div>
		  <p className="text-2xl font-semibold">{productCount}</p>
        </div>
		<div>
          <div className="flex items-center text-muted-foreground gap-2">
            <p className="text-lg">Pending Orders</p>
            <ChevronRight className="w-5 h-5 cursor-pointer" />
          </div>
		  <p className="text-2xl font-semibold">{orderCount}</p>
        </div>
		<div>
          <div className="flex items-center text-muted-foreground gap-2">
            <p className="text-lg">Out of Stock Products</p>
            <ChevronRight className="w-5 h-5 cursor-pointer" />
          </div>
		  <p className="text-2xl font-semibold">{outOfStockCount}</p>
        </div>
		<div>
          <div className="flex items-center text-muted-foreground gap-2">
            <p className="text-lg">Pending Returns</p>
            <ChevronRight className="w-5 h-5 cursor-pointer" />
          </div>
		  <p className="text-2xl font-semibold">{returnCount}</p>
        </div>
      </div>
    </div>
  );
};

export default ActionNeeded;
