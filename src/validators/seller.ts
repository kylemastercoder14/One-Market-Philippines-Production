import { z } from "zod";

export const ProfileSchema = z.object({
  businessName: z.string().min(1, {
    message: "Business name is required.",
  }),
  givenName: z.string().min(1, {
    message: "Given name is required.",
  }),
  familyName: z.string().min(1, {
    message: "Family name is required.",
  }),
  email: z
    .string()
    .email({
      message: "Invalid email.",
    })
    .min(1, {
      message: "Email is required.",
    }),
  nationality: z.string().min(1, {
    message: "Nationality is required.",
  }),
  contactNumber: z.string().min(1, {
    message: "Phone number is required.",
  }),
  residentialAddress: z.string().min(1, {
    message: "Residential address is required.",
  }),
  profileImage: z.string().optional(),
});

export const PoliciesSchema = z.object({
  policies: z.array(
    z.object({
      title: z.string().min(1, { message: "Title is required" }),
      content: z.string().min(1, { message: "Content is required" }),
    })
  ),
});
