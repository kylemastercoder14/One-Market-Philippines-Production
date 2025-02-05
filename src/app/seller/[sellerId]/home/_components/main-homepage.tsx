"use client";

import { SellerProduct } from "@prisma/client";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { CiShoppingBasket, CiWallet } from "react-icons/ci";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

const MainHomePage = ({
  product,
  paymentMethod,
}: {
  product: SellerProduct | null;
  paymentMethod: string | null;
}) => {
  const router = useRouter();
  const params = useParams();
  const profile = true;
  const requiredFields = [product, paymentMethod, profile];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `${completedFields} of ${totalFields} completed`;

  const initialStep = product ? (paymentMethod ? undefined : "step3") : "step2";
  const [selectedTab, setSelectedTab] = useState<"step2" | "step3" | undefined>(
    initialStep
  );

  return (
    <div className="w-full border bg-white rounded-md shadow-md p-5">
      <div className="grid md:grid-cols-5 grid-cols-1 gap-5">
        {/* Navigation Section */}
        <div className="md:col-span-2 border-r pr-5">
          <p className="text-2xl font-semibold">
            Let&apos;s start your business
          </p>
          <p className="text-muted-foreground text-sm">{completionText}</p>
          <div className="flex flex-col space-y-3 mt-3">
            {/* Profile Section (Disabled) */}
            <div className="flex cursor-not-allowed text-zinc-400 bg-muted py-4 px-3 items-center space-x-2">
              <FaCheckCircle color="#a1a1aa" />
              <p className="text-sm">Complete your profile</p>
            </div>

            {/* Add Product Section */}
            {product ? (
              <div className="flex cursor-not-allowed text-zinc-400 bg-muted py-4 px-3 items-center space-x-2">
                <FaCheckCircle color="#a1a1aa" />
                <p className="text-sm">Add your first product</p>
              </div>
            ) : (
              <div
                className={`flex py-4 px-3 items-center justify-between space-x-2 cursor-pointer
              ${
                selectedTab === "step2"
                  ? "text-[#8D021F] bg-[#8D021F]/10 hover:bg-[#8D021F]/15 border border-[#8D021F]/40"
                  : "text-[#8D021F] bg-[#8D021F] border-[#8D021F] hover:bg-[#8D021F]/80"
              }`}
                onClick={() => setSelectedTab("step2")}
              >
                <div className="flex items-center space-x-2">
                  <CiShoppingBasket color="#8D021F" />
                  <p className="text-sm">Add your first product</p>
                </div>
                <ChevronRight className="ml-auto w-4 h-4" />
              </div>
            )}

            {/* Link Payment Section */}
            {paymentMethod ? (
              <div className="flex cursor-not-allowed text-zinc-400 bg-muted py-4 px-3 items-center space-x-2">
                <FaCheckCircle color="#a1a1aa" />
                <p className="text-sm">Link payment method</p>
              </div>
            ) : (
              <div
                className={`flex py-4 px-3 items-center justify-between space-x-2 cursor-pointer
              ${
                selectedTab === "step3"
                  ? "text-[#8D021F] bg-[#8D021F]/10 hover:bg-[#8D021F]/15 border border-[#8D021F]/40"
                  : "text-[#8D021F] bg-[#8D021F] border-[#8D021F] hover:bg-[#8D021F]/80"
              }`}
                onClick={() => setSelectedTab("step3")}
              >
                <div className="flex items-center space-x-2">
                  <CiWallet color="#8D021F" />
                  <p className="text-sm">Link payment method</p>
                </div>
                <ChevronRight className="ml-auto w-4 h-4" />
              </div>
            )}
          </div>
        </div>

        {/* Content Section (Changes based on selectedTab) */}
        <div className="md:col-span-3">
          {selectedTab === "step2" && (
            <div className="flex items-start gap-10">
              <div className="relative w-[500px] h-[200px]">
                <Image
                  src="/images/verifying-vector.svg"
                  fill
                  className="w-full h-full"
                  alt="Verifying your document"
                />
              </div>
              <div className="mt-5">
                <h1 className="font-semibold text-lg">
                  Add your first product
                </h1>
                <p className="text-sm text-muted-foreground mt-3">
                  You can start adding your first product now. But it&apos;s not
                  visible to buyers until the admin verifies your documents.
                </p>
                <Button
                  className="mt-5"
                  onClick={() =>
                    router.push(`/seller/${params.sellerId}/manage-products/create`)
                  }
                >
                  Add Product
                </Button>
              </div>
            </div>
          )}

          {selectedTab === "step3" && (
            <div className="flex items-start gap-10">
              <div className="relative w-[200px] h-[200px]">
                <Image
                  src="/images/payment-account.svg"
                  fill
                  className="w-full h-full"
                  alt="Payment account"
                />
              </div>
              <div className="mt-5">
                <h1 className="font-semibold text-lg">
                  Link your payment method
                </h1>
                <p className="text-sm text-muted-foreground mt-3">
                  Add your payment method to start receiving payments from
                  buyers.
                </p>
                <Button
                  className="mt-5"
                  onClick={() =>
                    router.push(`/seller/${params.sellerId}/manage-products`)
                  }
                >
                  Link Payment Method
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainHomePage;
