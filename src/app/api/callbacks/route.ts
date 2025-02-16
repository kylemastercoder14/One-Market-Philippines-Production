/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/callbacks/route.ts

import { NextResponse } from "next/server";
import { getPaymentStatus } from "@/lib/xendit";

/**
 * Handles payment status callbacks from Xendit.
 * @param request - The Next.js request object.
 * @returns A NextResponse object with the result.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id } = body as { id: string };

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing payment ID" },
        { status: 400 }
      );
    }

    const paymentStatus = await getPaymentStatus(id);

    // TODO: Update your database or process the payment status
    console.log("Payment status:", paymentStatus);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error handling callback:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.response?.data?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
