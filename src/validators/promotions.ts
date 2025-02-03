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
