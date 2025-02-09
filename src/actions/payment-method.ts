"use server";

import db from "@/lib/db";
import { BankAccountValidators } from "@/validators";
import { z } from "zod";

export const createPaymentMethod = async (
  values: z.infer<typeof BankAccountValidators>,
  sellerId: string
) => {
  const safeValues = BankAccountValidators.safeParse(values);

  if (!safeValues.success) {
    return { error: "Please fill all the required fields" };
  }

  const {
    type,
    name,
    emailAddress,
    firstName,
    lastName,
    mobileNumber,
    cardNumber,
    cvc,
    validThru,
  } = safeValues.data;

  try {
    const existingPaymentMethod = await db.sellerBank.findFirst({
      where: {
        cardNumber,
        sellerId,
        name,
      },
    });

    if (existingPaymentMethod) {
      return { error: "Payment method already exists" };
    }

    const paymentMethod = await db.sellerBank.create({
      data: {
        type,
        name,
        emailAddress,
        firstName,
        lastName,
        mobileNumber,
        cardNumber,
        cvc,
        validThru,
        sellerId,
      },
    });

    return { success: "Payment method created successfully", paymentMethod };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred" };
  }
};
