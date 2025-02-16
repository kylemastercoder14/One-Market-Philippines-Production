import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const now = new Date();

  try {
    // Find and update expired coupons
    const expiredCoupons = await db.sellerCoupon.findMany({
      where: {
        endDate: { lt: now.toISOString() }, // endDate is less than the current date
        status: "Active", // Only update active coupons
      },
    });

    // Update the status of expired coupons to "Expired"
    for (const coupon of expiredCoupons) {
      await db.sellerCoupon.update({
        where: { id: coupon.id },
        data: { status: "Expired" },
      });
      console.log(`Updated coupon ${coupon.id} to Expired.`);
    }

    return new NextResponse("Updated expired coupons successfully.", {
      status: 201,
    });
  } catch (error) {
    console.error("Error updating expired coupons:", error);
    return new NextResponse("Failed to update expired coupons.", {
      status: 500,
    });
  } finally {
    await db.$disconnect();
  }
}
