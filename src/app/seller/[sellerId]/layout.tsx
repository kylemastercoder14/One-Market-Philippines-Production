/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { redirect } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { useSeller } from "@/hooks/use-seller";
import AppHeader from "./_components/app-header";

const SellerLayout = async ({ children }: { children: React.ReactNode }) => {
  const { seller } = await useSeller();
  if (!seller) {
    return redirect("/seller/account/login");
  }
  return (
    <SidebarProvider>
      <AppSidebar user={seller} />
      <SidebarInset>
        <AppHeader />
        <main className="px-6 py-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SellerLayout;
