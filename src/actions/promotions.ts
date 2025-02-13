"use server";

import db from "@/lib/db";

export const createProductDiscount = async (
  data: {
    name: string;
    startPeriod: Date;
    endPeriod: Date;
    type: string;
    value: number;
    products: { id: string }[];
  },
  sellerId: string
) => {
  if (data.startPeriod > data.endPeriod) {
    return { error: "Start period cannot be greater than end period" };
  }

  if (data.startPeriod < new Date()) {
    return { error: "Start period cannot be in the past" };
  }

  if (!data.name || !data.endPeriod || !data.type || !data.startPeriod) {
    return { error: "Please fill all the required fields" };
  }

  try {
    const existingDiscount = await db.sellerDiscount.findFirst({
      where: {
        discount: data.name,
        sellerId: sellerId,
      },
    });

    if (existingDiscount) {
      return { error: "A discount with this name already exists" };
    }

    const productDiscount = await db.sellerDiscount.create({
      data: {
        discount: data.name,
        startDate: data.startPeriod.toISOString(),
        endDate: data.endPeriod.toISOString(),
        type: data.type,
        sellerId: sellerId,
        value: data.value,
      },
    });

    await db.sellerProduct.updateMany({
      where: {
        id: {
          in: data.products.map((product) => product.id),
        },
      },
      data: {
        discountId: productDiscount.id,
      },
    });

    return {
      productDiscount,
      success: "Product discount created successfully",
    };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while creating the product discount" };
  }
};

export const createCoupon = async (
  data: {
    name: string;
    channel: string[];
    startPeriod: Date;
    endPeriod: Date;
    type: string;
    minimumSpend?: number;
    discountAmount: number;
    claimableQuantity: number;
  },
  sellerId: string
) => {
  if (data.startPeriod > data.endPeriod) {
    return { error: "Start period cannot be greater than end period" };
  }

  if (data.startPeriod < new Date()) {
    return { error: "Start period cannot be in the past" };
  }

  if (!data.name || !data.endPeriod || !data.type || !data.startPeriod) {
    return { error: "Please fill all the required fields" };
  }

  try {
    const existingCoupon = await db.sellerCoupon.findFirst({
      where: {
        name: data.name,
        sellerId: sellerId,
      },
    });

    if (existingCoupon) {
      return { error: "A coupon with this name already exists" };
    }

    const coupon = await db.sellerCoupon.create({
      data: {
        name: data.name,
        startDate: data.startPeriod.toISOString(),
        endDate: data.endPeriod.toISOString(),
        type: data.type,
        sellerId: sellerId,
        channel: data.channel,
        minimumSpend: data.minimumSpend,
        discountAmount: data.discountAmount,
        claimableQuantity: data.claimableQuantity,
      },
    });

    return {
      coupon,
      success: "Coupon created successfully",
    };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while creating the coupon" };
  }
};
