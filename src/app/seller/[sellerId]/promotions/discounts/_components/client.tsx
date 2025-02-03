import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns, ProductDiscountColumn } from "./column";

const ProductDiscountClient = ({ data }: { data: ProductDiscountColumn[] }) => {
  return (
	<div>
	  <DataTable searchKey="name" columns={columns} data={data} />
	</div>
  );
};

export default ProductDiscountClient;
