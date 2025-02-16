"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  Seller,
  SellerAddress,
  SellerBank,
  SellerPolicies,
} from "@prisma/client";
import SellerPoliciesForm from "./seller-policies-form";
import { Command } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface SellerWithProps extends Seller {
  sellerAddress: SellerAddress[];
  sellerBank: SellerBank[];
  sellerPolicies: SellerPolicies[];
}

const PoliciesClient = ({ seller }: { seller: SellerWithProps | null }) => {
  const pathname = usePathname();
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
          <h1 className="font-semibold text-lg">Policies</h1>
          <p className="text-muted-foreground text-sm">
            This is how others will see your policies. Make sure to be as clear
            as possible.
          </p>
          <div className="flex text-sm items-center gap-2 mt-3">
            <b>Note:</b> Press{" "}
            <Badge variant="secondary">
              <Command className="w-4 h-4 mr-1" />
              enter
            </Badge>{" "}
            to add a new policy field. Press{" "}
            <Badge variant="destructive">
              <Command className="w-4 h-4 mr-1" />
              escape
            </Badge>{" "}
            to remove a field.
          </div>
        </div>
        <Separator className="my-5" />
        <SellerPoliciesForm initialData={seller} />
      </div>
    </div>
  );
};

export default PoliciesClient;
