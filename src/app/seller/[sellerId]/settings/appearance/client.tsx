"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Seller, SellerAddress, SellerBank } from "@prisma/client";
import { useTheme } from "next-themes";

export interface SellerWithProps extends Seller {
  sellerAddress: SellerAddress[];
  sellerBank: SellerBank[];
}

const AppearanceClient = ({ seller }: { seller: SellerWithProps | null }) => {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();

  return (
    <div className="grid mt-5 md:grid-cols-10 grid-cols-1 gap-10">
      <div className="w-full flex space-y-1 flex-col md:col-span-2">
        <Link
          href={`/seller/${seller?.id}/settings`}
          className={`px-3 py-2 w-full rounded-md hover:underline ${pathname === `/seller/${seller?.id}/settings` ? "bg-accent font-semibold hover:no-underline" : ""}`}
        >
          Profile
        </Link>
        <Link
          href={`/seller/${seller?.id}/settings/attachments`}
          className={`px-3 py-2 w-full rounded-md hover:underline ${pathname === `/seller/${seller?.id}/settings/attachments` ? "bg-accent" : ""}`}
        >
          Attachments
        </Link>
        <Link
          href={`/seller/${seller?.id}/settings/policies`}
          className={`px-3 py-2 w-full rounded-md hover:underline ${pathname === `/seller/${seller?.id}/settings/policies` ? "bg-accent" : ""}`}
        >
          Policies
        </Link>
        <Link
          href={`/seller/${seller?.id}/settings/payment-accounts`}
          className={`px-3 py-2 w-full rounded-md hover:underline ${pathname === `/seller/${seller?.id}/settings/payment-accounts` ? "bg-accent" : ""}`}
        >
          Payment Accounts
        </Link>
        <Link
          href={`/seller/${seller?.id}/settings/appearance`}
          className={`px-3 py-2 w-full rounded-md hover:underline ${pathname === `/seller/${seller?.id}/settings/appearance` ? "bg-accent" : ""}`}
        >
          Appearance
        </Link>
      </div>
      <div className="md:col-span-5 w-full">
        <div>
          <h1 className="font-semibold text-lg">Appearance</h1>
          <p className="text-muted-foreground text-sm">
            Customize the appearance of the app. Automatically switch between
            light and dark themes.
          </p>
        </div>
        <Separator className="my-5" />
        <div className="space-y-2">
          <h3 className="font-semibold">Theme</h3>
          <p className="text-sm">Select the theme for the dashboard.</p>
        </div>
        <div className="flex items-center gap-5 mt-3">
          <div onClick={() => setTheme("light")}>
            <div
              className={`border-2 cursor-pointer w-40 rounded-md p-1 ${
                theme === "light" ? "border-primary" : "border-muted-foreground"
              }`}
            >
              <div className="bg-slate-200 p-3 w-full h-full rounded-md space-y-1.5">
                <div className="bg-white w-full p-2 space-y-1 rounded-md">
                  <div className="rounded-full w-1/2 h-2 bg-slate-200 animate-pulse"></div>
                  <div className="rounded-full w-full h-2 bg-slate-200 animate-pulse"></div>
                  <div className="rounded-full w-1/2 h-2 bg-slate-200 animate-pulse"></div>
                </div>
                <div className="bg-white w-full p-2 items-center flex gap-2 rounded-md">
                  <div className="rounded-full w-3 h-3 bg-slate-200 animate-pulse"></div>
                  <div className="rounded-full w-full h-2 bg-slate-200 animate-pulse"></div>
                </div>
                <div className="bg-white w-full p-2 items-center flex gap-2 rounded-md">
                  <div className="rounded-full w-3 h-3 bg-slate-200 animate-pulse"></div>
                  <div className="rounded-full w-full h-2 bg-slate-200 animate-pulse"></div>
                </div>
              </div>
            </div>
            <p className="text-center mt-2">Light</p>
          </div>
          <div onClick={() => setTheme("dark")}>
            <div
              className={`border-2 cursor-pointer w-40 rounded-md p-1 ${
                theme === "dark" ? "border-primary" : "border-muted-foreground"
              }`}
            >
              <div className="bg-slate-950 p-3 w-full h-full rounded-md space-y-1.5">
                <div className="bg-slate-800 w-full p-2 space-y-1 rounded-md">
                  <div className="rounded-full w-1/2 h-2 bg-slate-500 animate-pulse"></div>
                  <div className="rounded-full w-full h-2 bg-slate-500 animate-pulse"></div>
                  <div className="rounded-full w-1/2 h-2 bg-slate-500 animate-pulse"></div>
                </div>
                <div className="bg-slate-800 w-full p-2 items-center flex gap-2 rounded-md">
                  <div className="rounded-full w-3 h-3 bg-slate-500 animate-pulse"></div>
                  <div className="rounded-full w-full h-2 bg-slate-500 animate-pulse"></div>
                </div>
                <div className="bg-slate-800 w-full p-2 items-center flex gap-2 rounded-md">
                  <div className="rounded-full w-3 h-3 bg-slate-500 animate-pulse"></div>
                  <div className="rounded-full w-full h-2 bg-slate-500 animate-pulse"></div>
                </div>
              </div>
            </div>
            <p className="text-center mt-2">Dark</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceClient;
