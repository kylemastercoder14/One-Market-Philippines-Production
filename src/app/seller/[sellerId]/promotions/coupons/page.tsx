import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const SellerCoupon = async (props: {
  params: Promise<{
    sellerId: string;
  }>;
}) => {
  const params = await props.params;

  return (
    <div>
      <div className="flex justify-between mb-3">
        <div className="flex flex-col">
          <Link
            className="flex items-center gap-2"
            href={`/seller/${params.sellerId}/promotions`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sales Promotions</span>
          </Link>
          <h1 className="mt-1 text-2xl font-semibold">Coupon</h1>
        </div>
        <Button>
          <Link href={`/seller/${params.sellerId}/promotions/coupons/create`}>
            + Add Coupon
          </Link>
        </Button>
      </div>
	  <p>Coupons</p>
    </div>
  );
};

export default SellerCoupon;
