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
import { Button } from "@/components/ui/button";
import { Camera, LockKeyhole } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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

const UpdateProfile = () => {
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
            <BreadcrumbLink href="/profile">Profile</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid md:grid-cols-10 grid-cols-1 gap-5 mt-5">
        <div className="col-span-2 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              className={`text-base ${pathname === link.href || pathname.includes(link.href) ? "border-l-[3px] bg-orange-400/10 border-orange-600" : ""} hover:bg-orange-100 p-2 flex items-center gap-2 cursor-pointer`}
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
              <div className="cursor-pointer absolute bottom-0 right-0 rounded-full w-8 h-8 flex items-center justify-center bg-white border shadow">
                <Camera className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <Label>Name</Label>
            <Input
              placeholder="Enter your full name"
              value="Kyle Andre Lim"
              className="w-[600px]"
            />
          </div>
          <div className="space-y-2 mt-4">
            <Label>Username</Label>
            <Input
              placeholder="Enter your full name"
              value="kylemastercoder14"
              className="w-[600px]"
            />
          </div>
          <Button className="mt-5 rounded-full">Save Changes</Button>
          <div className="flex items-center text-sm mt-5 text-[#0A8800] gap-2">
            <LockKeyhole className="w-4 h-4" />
            <p>
              1 Market Philippines protects your personal information and keeps
              it private and safe.
            </p>
          </div>
          <p className="mt-4 w-[600px] text-sm text-muted-foreground text-center">
            How we use your profile avatar and username
          </p>
          <p className="mt-2 w-[600px] text-muted-foreground text-center text-xs">
            Your avatar and username may be shown to others when you add an item
            to your cart, buy an item, or participate in a promo or event. To
            opt out, go to &apos;Notifications→Avatar and username
            sharing&apos;.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
