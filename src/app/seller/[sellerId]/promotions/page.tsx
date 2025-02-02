import React from "react";
import Link from "next/link";

const SellerPromotions = async (props: {
  params: Promise<{
    sellerId: string;
  }>;
}) => {
  const params = await props.params;
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-2xl">Sales Promotions</p>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 mt-5">
        <div className="bg-white border shadow-md p-5">
          <p className="text-lg font-semibold">Product Discount</p>
          <p className="text-sm text-gray-500 mt-2">
            Offer product discounts to boost sales. The cost of the discount is
            covered by the seller.
          </p>
          <div className="flex items-center gap-5 mt-5">
            <Link className='text-orange-600 text-sm font-semibold hover:text-orange-600/80' href={`/seller/${params.sellerId}/promotions/discounts`}>
              View Details
            </Link>
			<Link className='text-orange-600 text-sm font-semibold hover:text-orange-600/80' href={`/seller/${params.sellerId}/promotions/discounts/create`}>
              Create product discount
            </Link>
          </div>
        </div>
		<div className="bg-white border shadow-md p-5">
          <p className="text-lg font-semibold">Flash Deal</p>
          <p className="text-sm text-gray-500 mt-2">
            Flash deal products that meet 1 Market Philippine&apos;s criteria are highlighted with a special tag. The cost of the flash deal is covered by the seller.
          </p>
          <div className="flex items-center gap-5 mt-5">
            <Link className='text-orange-600 text-sm font-semibold hover:text-orange-600/80' href={`/seller/${params.sellerId}/promotions/discounts`}>
              View Details
            </Link>
			<Link className='text-orange-600 text-sm font-semibold hover:text-orange-600/80' href={`/seller/${params.sellerId}/promotions/discounts`}>
              Create flash deal
            </Link>
          </div>
        </div>
		<div className="bg-white border shadow-md p-5">
          <p className="text-lg font-semibold">Shipping Fee Discount</p>
          <p className="text-sm text-gray-500 mt-2">
            A shipping fee discount is a powerful tool to increase conversions. The cost of the shipping fee discount is covered by the seller.
          </p>
          <div className="flex items-center gap-5 mt-5">
            <Link className='text-orange-600 text-sm font-semibold hover:text-orange-600/80' href={`/seller/${params.sellerId}/promotions/discounts`}>
              View Details
            </Link>
			<Link className='text-orange-600 text-sm font-semibold hover:text-orange-600/80' href={`/seller/${params.sellerId}/promotions/discounts`}>
              Create shipping fee discount
            </Link>
          </div>
        </div>
		<div className="bg-white border shadow-md p-5">
          <p className="text-lg font-semibold">Coupon</p>
          <p className="text-sm text-gray-500 mt-2">
            Create coupon that customers can claim through product detail pages, search results, and the shopping cart. The cost of the coupon is covered by the seller.
          </p>
          <div className="flex items-center gap-5 mt-5">
            <Link className='text-orange-600 text-sm font-semibold hover:text-orange-600/80' href={`/seller/${params.sellerId}/promotions/discounts`}>
              View Details
            </Link>
			<Link className='text-orange-600 text-sm font-semibold hover:text-orange-600/80' href={`/seller/${params.sellerId}/promotions/discounts`}>
              Create coupon
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPromotions;
