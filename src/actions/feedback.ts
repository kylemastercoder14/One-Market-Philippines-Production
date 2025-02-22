"use server";

import db from "@/lib/db";

export const submitFeedback = async (
  values: {
    rate: string;
    comment: string;
    others: string;
  },
  userId: string
) => {
  if (!userId) {
    return { error: "You must be logged in to submit feedback." };
  }

  try {
    const comment =
      values.comment === "Others" ? values.others : values.comment;
    await db.feedback.create({
      data: {
        rating: values.rate,
        comment: comment,
        userId,
      },
    });

    return { success: "Feedback submitted successfully." };
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return { error: "An error occurred while submitting feedback." };
  }
};
