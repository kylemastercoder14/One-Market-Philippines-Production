import { z } from "zod";

export const BankAccountValidators = z
  .object({
    name: z.string().min(1, "Provider is required"),
    type: z.enum(["Bank", "EWallet"]),
    cardNumber: z.string().optional(),
    validThru: z.string().optional(),
    cvc: z.string().optional(),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    emailAddress: z.string().email("Invalid email address"),
    mobileNumber: z.string().min(1, "Mobile number is required"),
  })
  .refine(
    (data) =>
      data.type === "Bank"
        ? data.cardNumber && data.cardNumber.length === 16
        : true,
    {
      message: "Card number must be 16 digits",
      path: ["cardNumber"],
    }
  )
  .refine(
    (data) =>
      data.type === "Bank"
        ? data.validThru && /^(0[1-9]|1[0-2])\/\d{2}$/.test(data.validThru)
        : true,
    {
      message: "ValidThru is required when type is Bank",
      path: ["validThru"],
    }
  )
  .refine(
    (data) => (data.type === "Bank" ? data.cvc && data.cvc.length === 3 : true),
    {
      message: "CVC must be 3 digits",
      path: ["cvc"],
    }
  );
