import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns, CustomerColumn } from "./column";

const CustomerClient = ({ data }: { data: CustomerColumn[] }) => {
  return (
	<div>
	  <DataTable searchKey="name" columns={columns} data={data} />
	</div>
  );
};

export default CustomerClient;
