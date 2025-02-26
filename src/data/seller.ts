"use server";

import db from "@/lib/db";

export const getSellerById = async (id: string) => {
  try {
    const seller = await db.seller.findUnique({
      where: { id },
      include: {
        sellerCoupon: {
          where: {
            status: "Active",
          },
        },
      },
    });

    return seller;
  } catch {
    return null;
  }
};
