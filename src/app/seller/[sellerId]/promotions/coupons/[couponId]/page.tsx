

import React from 'react'
import HeadingAction from '@/components/ui/heading-action';

const CouponId = async (props: {
	params: Promise<{
	  couponId: string;
	  sellerId: string;
	}>;
  }) => {
	const params = await props.params;
	const coupons = null;
  return (
	<div>
<HeadingAction
        className="w-80"
        title={
          coupons ? `Edit coupon` : "Create new coupon"
        }
        link={`/seller/${params.sellerId}/promotions/coupons`}
      />
      <p className="text-sm text-muted-foreground mt-2">
        {coupons
          ? "Modify the existing coupon. Fill in the coupon details, including type, and promotion period, to create a new coupon."
          : "Fill in the coupon details, including type, and promotion period, to create a new coupon."}
      </p>
	</div>
  )
}

export default CouponId
