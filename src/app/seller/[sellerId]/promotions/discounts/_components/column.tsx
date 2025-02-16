"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CellAction } from './cell-action';

export type ProductDiscountColumn = {
  id: string;
  name: string;
  period: string;
  type: string;
  discountStatus: string;
};

export const columns: ColumnDef<ProductDiscountColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer flex items-center"
        >
          Promotion name
          <ChevronsUpDown className="ml-2 h-4 w-4 no-print" />
        </span>
      );
    },
  },
  {
    accessorKey: "period",
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer flex items-center"
        >
          Promotion period
          <ChevronsUpDown className="ml-2 h-4 w-4 no-print" />
        </span>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer flex items-center"
        >
          Discount type
          <ChevronsUpDown className="ml-2 h-4 w-4 no-print" />
        </span>
      );
    },
    cell: ({ row }) => {
      return (
        <Badge
          variant={
            row.original.type === "Percentage Off" ? "default" : "secondary"
          }
        >
          {row.original.type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "discountStatus",
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer flex items-center"
        >
          Status
          <ChevronsUpDown className="ml-2 h-4 w-4 no-print" />
        </span>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${row.original.discountStatus === "Active" ? "bg-green-600" : "bg-red-600"}`}
          ></div>
          <span>{row.original.discountStatus}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <CellAction id={row.original.id} />
      );
    },
  },
];
