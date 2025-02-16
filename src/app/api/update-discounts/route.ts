import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const now = new Date();

  try {
    // Find and update expired discounts
    const expiredDiscounts = await db.sellerDiscount.findMany({
      where: {
        endDate: { lt: now.toISOString() }, // endDate is less than the current date
        status: "active", // Only update active discounts
      },
    });

    // Update the status of expired discounts to "Inactive"
    for (const discount of expiredDiscounts) {
      await db.sellerDiscount.update({
        where: { id: discount.id },
        data: { status: "Inactive" },
      });
      console.log(`Updated discount ${discount.id} to Inactive.`);
    }

    return new NextResponse("Updated expired discounts successfully.", {
      status: 201,
    });
  } catch (error) {
    console.error("Error updating expired discounts:", error);
    return new NextResponse("Failed to update expired discounts.", {
      status: 500,
    });
  } finally {
    await db.$disconnect();
  }
}
