/* eslint-disable @typescript-eslint/no-explicit-any */

import type { NextApiRequest, NextApiResponse } from "next";
import { getPaymentStatus } from "@/lib/xendit";

interface CallbackResponse {
  success: boolean;
  error?: string;
  message?: string;
}

/**
 * Handles payment status callbacks from Xendit.
 * @param req - The Next.js API request object.
 * @param res - The Next.js API response object.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CallbackResponse>
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const { id } = req.body as { id: string };

  if (!id) {
    return res
      .status(400)
      .json({ success: false, error: "Missing payment ID" });
  }

  try {
    const paymentStatus = await getPaymentStatus(id);

    // TODO: Update your database or process the payment status
    console.log("Payment status:", paymentStatus);

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("Error handling callback:", error);
    return res.status(500).json({
      success: false,
      error: error.response?.data?.message || "Internal Server Error",
    });
  }
}
