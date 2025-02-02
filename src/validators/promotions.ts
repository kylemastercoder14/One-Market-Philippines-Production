import { z } from "zod";

export const ProductDiscountValidators = z.object({
  name: z.string().min(1, { message: "Promotion name is required" }),
  startPeriod: z
    .date()
    .min(new Date(), { message: "Start period is required" }),
  endPeriod: z.date().min(new Date(), { message: "End period is required" }),
  type: z.enum(["Percentage Off", "Fixed Price"], {
    required_error: "You need to select a discount type.",
  }),
  products: z.array(z.string()).min(1, { message: "Products are required" }),
});
