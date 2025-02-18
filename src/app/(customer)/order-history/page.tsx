"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Search } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  {
    title: "Your orders",
    icon: "📦",
    href: "/order-history",
  },
  {
    title: "Your reviews",
    icon: "📝",
    href: "/reviews",
  },
  {
    title: "Your profile",
    icon: "👤",
    href: "/profile",
  },
  {
    title: "Coupons & offers",
    icon: "💰",
    href: "/coupons",
  },
  {
    title: "Followed stores",
    icon: "🏪",
    href: "/stores",
  },
  {
    title: "Browsing history",
    icon: "🔍",
    href: "/history",
  },
  {
    title: "Addresses",
    icon: "🏠",
    href: "/addresses",
  },
  {
    title: "Account security",
    icon: "🔒",
    href: "/security",
  },
  {
    title: "Notifications",
    icon: "🔔",
    href: "/notifications",
  },
];

const OrderHistory = () => {
  const pathname = usePathname();
  return (
    <div className="md:px-[200px] px-10 pb-20 pt-24">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Your Orders</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid md:grid-cols-10 grid-cols-1 gap-5 mt-5">
        <div className="col-span-2 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              className={`text-base ${pathname === link.href ? "border-l-[3px] bg-orange-400/10 border-orange-600" : ""} hover:bg-orange-100 p-2 flex items-center gap-2 cursor-pointer`}
              href={link.href}
            >
              <span className="text-base">{link.icon}</span>
              <span>{link.title}</span>
            </Link>
          ))}
        </div>
        <div className="col-span-8">
          <div className="flex items-center justify-between">
            <div className="flex text-sm text-muted-foreground items-center cursor-pointer gap-5">
              <span className="font-semibold text-orange-600 border-b-2 border-orange-600 py-1">
                All orders
              </span>
              <span>Processing</span>
              <span>Shipped</span>
              <span>Delivered</span>
              <span>Returns</span>
            </div>
            <div className="border px-3 py-3 rounded-full flex items-center w-[300px]">
              <input
                type="text"
                className="pl-2 border-none outline-none bg-transparent text-sm w-full"
                placeholder="Item name / Order ID / Tracking No."
              />
              <Search className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-[30vh]">
            <Image
              src="/icons/empty.svg"
              width={100}
              height={100}
              alt="Empty"
            />
            <p className="mt-1 text-muted-foreground">You don&apos;t have any orders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
