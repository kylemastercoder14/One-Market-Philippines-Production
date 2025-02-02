import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns, CategoryColumn } from "./column";

const CategoryClient = ({ data }: { data: CategoryColumn[] }) => {
  return (
    <div>
      <DataTable searchKey="name" columns={columns} data={data} />
    </div>
  );
};

export default CategoryClient;
