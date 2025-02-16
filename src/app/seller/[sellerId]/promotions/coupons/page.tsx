import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import db from "@/lib/db";
import { format, isAfter, isBefore } from "date-fns";
import CouponClient from './_components/client';
import { CouponColumn } from './_components/column';

const SellerCoupon = async (props: {
  params: Promise<{
    sellerId: string;
  }>;
}) => {
  const params = await props.params;
  const data = await db.sellerCoupon.findMany({
    where: {
      sellerId: params.sellerId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedData: CouponColumn[] = data.map((item) => ({
    id: item.id,
    name: item.name,
    channel: item.channel.join(", "),
    claimableQuantity: item.claimableQuantity,
    couponStatus: item.status,
    period: `${format(item.startDate, "MMMM dd, yyyy")} - ${format(item.endDate, "MMMM dd, yyyy")}`,
    type: item.type === "Money off" ? `₱${item.discountAmount} off` : `₱${item.discountAmount} off orders over ₱${item.minimumSpend}`,
  }));

  const now = new Date();

  const ongoingDiscounts = formattedData.filter(
    (item) =>
      isBefore(new Date(item.period.split(" - ")[0]), now) &&
      isAfter(new Date(item.period.split(" - ")[1]), now) &&
      item.couponStatus === "Active"
  );

  const upcomingDiscounts = formattedData.filter(
    (item) =>
      isAfter(new Date(item.period.split(" - ")[0]), now) &&
      item.couponStatus === "Active"
  );

  const expiredDiscounts = formattedData.filter(
    (item) =>
      isAfter(now, new Date(item.period.split(" - ")[1])) &&
      item.couponStatus === "Expired"
  );
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
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent className="mt-2" value="all">
          <CouponClient data={formattedData} />
        </TabsContent>
        <TabsContent className="mt-2" value="ongoing">
          <CouponClient data={ongoingDiscounts} />
        </TabsContent>
        <TabsContent className="mt-2" value="upcoming">
          <CouponClient data={upcomingDiscounts} />
        </TabsContent>
        <TabsContent className="mt-2" value="expired">
          <CouponClient data={expiredDiscounts} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellerCoupon;
