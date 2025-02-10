import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns, ProductColumn } from "./column";

const ProductClient = ({ data }: { data: ProductColumn[] }) => {
  return (
    <div>
      <DataTable searchKey="name" columns={columns} data={data} />
    </div>
  );
};

export default ProductClient;
