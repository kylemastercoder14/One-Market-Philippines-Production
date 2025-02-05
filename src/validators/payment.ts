import { z } from "zod";

export const BankAccountValidators = z.object({
  name: z.string().min(1, "Provider is required"),
  type: z.enum(["Bank", "EWallet"]),
  cardNumber: z.string().min(16, "Card number must be 16 digits"),
  validThru: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid format. Use MM/YY"),
  cvc: z.string().min(3, "CVC must be 3 digits"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  emailAddress: z.string().email("Invalid email address"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
});
