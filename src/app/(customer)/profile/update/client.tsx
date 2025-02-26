/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Camera, LockKeyhole, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { updateUserImage, updateUserName } from "@/actions/user";
import SingleImageUpload from "../../../../components/globals/single-image-upload";

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

const UpdateProfileClient = ({
  data,
}: {
  data: {
    name: string | null;
    image: string | null;
    id: string | null;
    email: string | null;
  };
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = React.useState(false);
  const [name, setName] = React.useState(data.name || "");

  const [isEditing, setIsEditing] = React.useState(false);
  const [image, setImage] = React.useState(data.image || "");
  const toggleEdit = () => setIsEditing((prev) => !prev);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await updateUserName(name, data.id as string);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.success);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const onUpload = async (url: string) => {
    setIsLoading(true);
    try {
      setImage(url);
      const res = await updateUserImage(url, data.id as string);
      if (res.error) {
        toast.error(res.error);
      } else {
        setIsEditing(false);
        toast.success(res.success);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
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
          <div className="flex flex-col gap-3">
            {!isEditing && (
              <div className="relative w-20 h-20">
                <Avatar className="w-20 h-20">
                  <AvatarImage className='object-cover' src={data.image || ""} />
                  <AvatarFallback>{data.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div
                  onClick={toggleEdit}
                  className="cursor-pointer absolute bottom-0 right-0 rounded-full w-8 h-8 flex items-center justify-center bg-white border shadow"
                >
                  <Camera className="w-4 h-4" />
                </div>
              </div>
            )}
            {isEditing && (
              <div className='flex items-end'>
                <SingleImageUpload
                  disabled={isLoading}
                  onSingleImageUpload={(url) => {
                    if (url) {
                      onUpload(url);
                    }
                  }}
                />
                <div
                  onClick={toggleEdit}
                  className="cursor-pointer -ml-4 text-white rounded-full w-8 h-8 flex items-center justify-center bg-[#8D021F] border shadow"
                >
                  <X className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>
          <form onSubmit={onSubmit}>
            <div className="space-y-2 mt-4">
              <Label>Name</Label>
              <Input
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                className="w-[600px]"
              />
            </div>
            <div className="space-y-2 mt-4">
              <Label>Email Address</Label>
              <Input
                placeholder="Enter your email address"
                value={data.email || ""}
                disabled
                className="w-[600px]"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="mt-5 rounded-full"
            >
              Save Changes
            </Button>
          </form>

          <div className="flex items-center text-sm mt-5 text-[#0A8800] gap-2">
            <LockKeyhole className="w-4 h-4" />
            <p>
              1 Market Philippines protects your personal information and keeps
              it private and safe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileClient;
