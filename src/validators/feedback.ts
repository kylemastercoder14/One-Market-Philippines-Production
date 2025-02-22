import { z } from "zod";

export const FeedbackValidators = z.object({
  rate: z.string().min(1, { message: "Please rate your experience" }),
  comment: z.string().min(1, { message: "Please provide a comment" }),
  others: z.string().optional(),
});
