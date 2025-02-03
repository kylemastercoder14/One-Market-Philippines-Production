"use client";

import * as React from "react";
import {
  Box,
  FileText,
  LayoutDashboard,
  Megaphone,
  MessageCircleQuestion,
  Settings,
  ShoppingBag,
  Users,
  Wallet2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { AppLogo } from "./app-logo";
import { NavUser } from "./nav-user";
import { Seller } from "@prisma/client";
import { useParams } from "next/navigation";

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: Seller }) {
  const params = useParams();
  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: `/seller/${params.sellerId}/home`,
        icon: LayoutDashboard,
      },
      {
        title: "Manage Products",
        url: `/seller/${params.sellerId}/manage-products`,
        icon: ShoppingBag,
      },
      {
        title: "Orders",
        url: `/seller/${params.sellerId}/orders`,
        icon: FileText,
      },
      {
        title: "Shipping",
        url: `/seller/${params.sellerId}/shipping`,
        icon: Box,
      },
      {
        title: "Promotions",
        url: "#",
        icon: Megaphone,
        items: [
          {
            title: "Product Discount",
            url: `/seller/${params.sellerId}/promotions/discounts`,
          },
          {
            title: "Coupons",
            url: `/seller/${params.sellerId}/promotions/coupons`,
          }
        ]
      },
      {
        title: "Customers",
        url: `/seller/${params.sellerId}/customers`,
        icon: Users,
      },
      {
        title: "Payment Method",
        url: `/seller/${params.sellerId}/payment-method`,
        icon: Wallet2,
      },
      {
        title: "Settings",
        url: `/seller/${params.sellerId}/settings`,
        icon: Settings,
      },
      {
        title: "Help Center",
        url: `/seller/${params.sellerId}/help-center`,
        icon: MessageCircleQuestion,
      },
    ],
  };
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <AppLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
