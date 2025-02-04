import React from "react";
import HeadingAction from "@/components/ui/heading-action";
import CouponForm from "@/components/forms/coupon-form";
import db from "@/lib/db";

const CouponId = async (props: {
  params: Promise<{
    couponId: string;
    sellerId: string;
  }>;
}) => {
  const params = await props.params;
  const coupons = null;
  const seller = await db.seller.findUnique({
    where: {
      id: params.sellerId,
    },
  });
  return (
    <div>
      <HeadingAction
        className="w-80"
        title={coupons ? `Edit coupon` : "Create new coupon"}
        link={`/seller/${params.sellerId}/promotions/coupons`}
      />
      <p className="text-sm text-muted-foreground mt-2">
        {coupons
          ? "Modify the existing coupon. Fill in the coupon details, including type, and promotion period, to create a new coupon."
          : "Fill in the coupon details, including type, and promotion period, to create a new coupon."}
      </p>
      <CouponForm
        initialData={coupons}
        sellerId={params.sellerId}
        sellerName={seller?.name as string}
      />
    </div>
  );
};

export default CouponId;
