import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductDiscountClient from "./_components/client";
import db from "@/lib/db";
import { ProductDiscountColumn } from "./_components/column";
import { format, isBefore, isAfter } from "date-fns";

const SellerProductDiscounts = async (props: {
  params: Promise<{
    sellerId: string;
  }>;
}) => {
  const params = await props.params;

  const data = await db.sellerDiscount.findMany({
    where: {
      sellerId: params.sellerId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedData: ProductDiscountColumn[] = data.map((item) => ({
    id: item.id,
    name: item.discount,
    period: `${format(item.startDate, "MMMM dd, yyyy")} - ${format(item.endDate, "MMMM dd, yyyy")}`,
    type: item.type,
    discountStatus: item.status,
  }));

  const now = new Date();

  const ongoingDiscounts = formattedData.filter(
    (item) =>
      isBefore(new Date(item.period.split(" - ")[0]), now) &&
      isAfter(new Date(item.period.split(" - ")[1]), now) &&
      item.discountStatus === "Active"
  );

  const upcomingDiscounts = formattedData.filter(
    (item) =>
      isAfter(new Date(item.period.split(" - ")[0]), now) &&
      item.discountStatus === "Active"
  );

  const expiredDiscounts = formattedData.filter(
    (item) =>
      isAfter(now, new Date(item.period.split(" - ")[1])) &&
      item.discountStatus === "Expired"
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
          <h1 className="mt-1 text-2xl font-semibold">Product Discount</h1>
        </div>
        <Button>
          <Link href={`/seller/${params.sellerId}/promotions/discounts/create`}>
            + Add Product Discount
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
          <ProductDiscountClient data={formattedData} />
        </TabsContent>
        <TabsContent className="mt-2" value="ongoing">
          <ProductDiscountClient data={ongoingDiscounts} />
        </TabsContent>
        <TabsContent className="mt-2" value="upcoming">
          <ProductDiscountClient data={upcomingDiscounts} />
        </TabsContent>
        <TabsContent className="mt-2" value="expired">
          <ProductDiscountClient data={expiredDiscounts} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellerProductDiscounts;
