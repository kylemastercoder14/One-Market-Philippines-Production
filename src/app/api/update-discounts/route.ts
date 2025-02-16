import { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
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

      res
        .status(200)
        .json({ message: "Expired discounts updated successfully." });
    } catch (error) {
      console.error("Error updating expired discounts:", error);
      res.status(500).json({ error: "Failed to update expired discounts." });
    } finally {
      await db.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
