import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns, CouponColumn } from "./column";

const CouponClient = ({ data }: { data: CouponColumn[] }) => {
  return (
    <div>
      <DataTable searchKey="name" columns={columns} data={data} />
    </div>
  );
};

export default CouponClient;
