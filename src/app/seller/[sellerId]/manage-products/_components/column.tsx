"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, CircleCheckBig, CircleHelp, CircleOff, Timer } from "lucide-react";
import Image from "next/image";
import { CellAction } from './cell-action';

export type ProductColumn = {
  id: string;
  name: string;
  image: string;
  category: string;
  sku: string;
  href: string;
  status: string;
  slug: string;
  tags: string;
  availability: string;
  isVariant: boolean;
  price: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <div className="relative w-[70px] h-[70px]">
          <Image
            className="w-full h-full rounded-md object-cover"
            fill
            alt={row.original.name}
            src={row.original.image}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer flex items-center"
        >
          Product
          <ChevronsUpDown className="ml-2 h-4 w-4 no-print" />
        </span>
      );
    },
    cell: ({ row }) => {
      return <span className="w-[400px] truncate overflow-hidden whitespace-nowrap block">{row.original.name}</span>;
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer flex items-center"
        >
          Category
          <ChevronsUpDown className="ml-2 h-4 w-4 no-print" />
        </span>
      );
    },
  },
  {
    accessorKey: "sku",
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer flex items-center"
        >
          SKU
          <ChevronsUpDown className="ml-2 h-4 w-4 no-print" />
        </span>
      );
    },
  },
  {
    accessorKey: "tags",
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer flex items-center"
        >
          Tags
          <ChevronsUpDown className="ml-2 h-4 w-4 no-print" />
        </span>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer flex items-center"
        >
          Price
          <ChevronsUpDown className="ml-2 h-4 w-4 no-print" />
        </span>
      );
    },
  },
  {
    accessorKey: "availability",
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer flex items-center"
        >
          Availability
          <ChevronsUpDown className="ml-2 h-4 w-4 no-print" />
        </span>
      );
    },
    cell: ({ row }) => {
      const inStock = row.original.availability === "In stock";
      return (
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${inStock ? "bg-green-600" : "bg-red-600"}`}
          ></div>
          <span>{row.original.availability}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
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
      switch (row.original.status) {
        case "Approved":
          return (
            <div className='flex items-center gap-2'>
              <CircleCheckBig className='w-4 h-4' />
              {row.original.status}
            </div>
          );
        case "Pending":
          return (
            <div className='flex items-center gap-2'>
              <Timer className='w-4 h-4' />
              {row.original.status}
            </div>
          );
        case "Rejected":
          return (
            <div className='flex items-center gap-2'>
              <CircleOff className='w-4 h-4' />
              {row.original.status}
            </div>
          );
        default:
          return (
            <div className='flex items-center gap-2'>
              <CircleHelp className='w-4 h-4' />
              {row.original.status}
            </div>
          );
      }
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({row}) => (
      <CellAction id={row.original.id} slug={row.original.slug} isVariant={row.original.isVariant} />
    )
  }
];
