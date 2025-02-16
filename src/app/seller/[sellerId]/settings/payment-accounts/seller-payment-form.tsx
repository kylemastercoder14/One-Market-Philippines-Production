"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { SellerWithProps } from "./client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { maskNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

const SellerPaymentForm = ({
  initialData,
}: {
  initialData: SellerWithProps | null;
}) => {
  const router = useRouter();
  return (
    <>
      <div className="space-y-3">
        {initialData?.sellerBank.map((bank) => {
          let image;
          switch (bank.name) {
            case "Gcash":
              image =
                "https://getcash.ph/wp-content/uploads/2021/01/Transparent-1280-x-720.png";
              break;
            case "Visa":
              image = "https://www.svgrepo.com/show/508730/visa-classic.svg";
              break;
            case "Mastercard":
              image = "https://www.svgrepo.com/show/508703/mastercard.svg";
              break;
            case "BPI":
              image =
                "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Bank_of_the_Philippine_Islands_logo.svg/1920px-Bank_of_the_Philippine_Islands_logo.svg.png";
              break;
            case "JCB":
              image = "https://www.svgrepo.com/show/508695/jcb.svg";
              break;
            case "BDO":
              image =
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/BDO_Unibank_%28logo%29.svg/1920px-BDO_Unibank_%28logo%29.svg.png";
              break;
            case "RCBC":
              image =
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/RCBC_logo.svg/716px-RCBC_logo.svg.png?20230919051148";
              break;
            case "Maya":
              image = "https://logodix.com/logo/2206804.jpg";
              break;
            case "Union Bank":
              image =
                "https://upload.wikimedia.org/wikipedia/commons/9/9c/UnionBank_PH_logo.svg";
              break;
            case "China Bank":
              image =
                "https://upload.wikimedia.org/wikipedia/commons/8/8f/Chinabank_logo.svg";
              break;
          }
          return (
            <div
              key={bank.id}
              className="flex rounded-lg items-center border py-3 px-5 gap-3"
            >
              <Image
                src={image as string}
                alt="Payment"
                width={80}
                height={80}
                className="object-cover"
              />
              <div>
                <div className="font-semibold flex items-center gap-2">
                  <div>
                    {bank.firstName} {bank.lastName}
                  </div>
                  <Badge
                    variant={bank.type === "Bank" ? "default" : "secondary"}
                  >
                    {bank.type === "Bank" ? "Bank" : "E-Wallet"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {bank.type === "Bank"
                    ? maskNumber(bank.cardNumber || "", "Bank")
                    : maskNumber(bank.mobileNumber || "", "EWallet")}
                </p>
              </div>
            </div>
          );
        })}

        <Button
          onClick={() =>
            router.push(`/seller/${initialData?.id}/payment-method/xendit`)
          }
          variant="ghost"
          type="button"
          size="sm"
        >
          <Plus className="w-4 h-4" /> Add Payment Account
        </Button>
      </div>
    </>
  );
};

export default SellerPaymentForm;
