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

const Reviews = () => {
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
            <BreadcrumbPage>Your Reviews</BreadcrumbPage>
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
          <div className="flex flex-col items-center justify-center h-[30vh]">
            <Image
              src="https://aimg.kwcdn.com/upload_aimg/transaction/ab2196f8-a112-4bea-ac1b-05cb774990bc.png.slim.png"
              width={100}
              height={100}
              alt="Filetext"
            />
            <p className="mt-1 text-black">
              You don&apos;t have any reviews
            </p>
			<p className='text-sm text-muted-foreground'>You have no completed reviews or your reviews have been deleted.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
