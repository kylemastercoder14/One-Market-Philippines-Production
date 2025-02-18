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
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EditIcon, LockKeyhole } from "lucide-react";

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
  const router = useRouter();
  return (
    <div className="md:px-[200px] px-10 pb-20 pt-24">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Profile</BreadcrumbPage>
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
          <div className="flex items-start gap-3">
            <div className="relative w-20 h-20">
              <Image
                src="/profile.jpg"
                fill
                className="w-full h-full rounded-full"
                alt="profile"
              />
            </div>
            <div className="">
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold">Kyle Andre Lim</p>
                <EditIcon
                  onClick={() => router.push("/profile/update")}
                  className="w-4 cursor-pointer h-4 text-muted-foreground"
                />
              </div>
              <div className="flex text-center text-sm items-center gap-5">
                <div>
                  <p>0</p>
                  <p className="text-xs text-muted-foreground">Total reviews</p>
                </div>
                <p>|</p>
                <div>
                  <p>0</p>
                  <p className="text-xs text-muted-foreground">Helpfuls</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center text-sm mt-5 text-[#0A8800] gap-2">
            <LockKeyhole className="w-4 h-4" />
            <p>
              Your information and privacy will be kept secure and
              uncompromised.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center h-[30vh]">
            <Image
              src="https://aimg.kwcdn.com/upload_aimg/transaction/ab2196f8-a112-4bea-ac1b-05cb774990bc.png.slim.png"
              width={100}
              height={100}
              alt="Filetext"
            />
            <p className="mt-1 text-black">You don&apos;t have any reviews</p>
            <p className="text-sm text-muted-foreground">
              You have no completed reviews or your reviews have been deleted.
            </p>
            <Button size="sm" className="rounded-full mt-5">
              Go to your reviews
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
