import { z } from "zod";

export const ProductDiscountValidators = z.object({
  name: z.string().min(1, { message: "Promotion name is required" }),
  startPeriod: z
    .date()
    .min(new Date(), { message: "Start period is required" }),
  endPeriod: z.date().min(new Date(), { message: "End period is required" }),
  type: z.string().min(1, { message: "Promotion type is required" }),
  products: z.array(z.string()).min(1, { message: "Products are required" }),
  value: z.coerce.number().min(1, { message: "Value is required" }),
});

export const CouponValidators = z
  .object({
    name: z.string().min(1, { message: "Coupon name is required" }),
    channel: z.array(z.string()).nonempty("Please choose at least one channel"),
    startPeriod: z
      .date()
      .min(new Date(), { message: "Start period is required" }),
    endPeriod: z.date().min(new Date(), { message: "End period is required" }),
    type: z.string().min(1, { message: "Coupon type is required" }),
    minimumSpend: z.coerce.number().optional(), // Optional by default
    discountAmount: z.coerce
      .number()
      .min(1, { message: "Discount amount is required" }),
    claimableQuantity: z.coerce.number().min(1, {
      message: "Claimable quantity is required",
    }),
  })
  .refine(
    (data) => {
      // If the type is "Money off (min.spend)", minimumSpend is required
      if (data.type === "Money off (min.spend)") {
        return data.minimumSpend !== undefined && data.minimumSpend > 0;
      }
      // Otherwise, minimumSpend is optional
      return true;
    },
    {
      message: "Minimum spend is required for 'Money off (min.spend)' coupons",
      path: ["minimumSpend"], // Attach the error to the minimumSpend field
    }
  );
