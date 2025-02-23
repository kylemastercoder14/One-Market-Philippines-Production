import { z } from "zod";

export const ReportSuspiciousValidation = z.object({
  howWereYouContacted: z.string().min(1, {
    message: "Please provide a description of how you were contacted.",
  }),
  suspiciousEmail: z.string().min(1, {
    message: "Please provide the suspicious email address.",
  }),
  platformSuspicious: z.string().min(1, {
    message: "Please provide the platform of the suspicious activity.",
  }),
  lostOfAsset: z
    .string()
    .min(1, { message: "Please provide a description of the lost asset." }),
  description: z.string().min(1, {
    message: "Please provide a description of the suspicious activity.",
  }),
  screenShot: z.string().min(1, {
    message: "Please provide a screenshot of the suspicious activity.",
  }),
});

export const ReportFakeWebsiteValidation = z.object({
  suspiciousLink: z.string().min(1, {
    message: "Please provide the suspicious link.",
  }),
  submitPersonalInfo: z.array(z.string()).min(1, {
    message: "Please provide at least one personal information submitted.",
  }),
  lostOfAsset: z.string().min(1, {
    message: "Please provide a description of the lost asset.",
  }),
  description: z.string().min(1, {
    message: "Please provide a description of the suspicious activity.",
  }),
  screenShot: z.string().min(1, {
    message: "Please provide a screenshot of the suspicious activity.",
  }),
});

export const ReportFakeJobValidation = z.object({
  howWereYouContacted: z.string().min(1, {
    message: "Please provide a description of how you were contacted.",
  }),
  others: z.string().optional(),
  suspiciousLink: z.string().min(1, {
    message: "Please provide the suspicious link.",
  }),
  lostOfAsset: z.string().min(1, {
    message: "Please provide a description of the lost asset.",
  }),
  description: z.string().min(1, {
    message: "Please provide a description of the suspicious activity.",
  }),
  screenShot: z.string().min(1, {
    message: "Please provide a screenshot of the suspicious activity.",
  }),
});
