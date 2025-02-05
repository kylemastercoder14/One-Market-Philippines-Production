import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // For unique Idempotency key

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse request body

    // Xendit Payout API URL
    const url = "https://api.xendit.co/v2/payouts";

    // Generate a unique Idempotency Key for each request
    const idempotencyKey = uuidv4();

    // API request to Xendit
    const response = await axios.post(
      url,
      {
        reference_id: body.reference_id || "disb-1482928194",
        channel_code: body.channel_code || "PH_GCASH",
        channel_properties: {
          account_number: body.account_number || "000000000099",
          account_holder_name: body.account_holder_name || "Michael Chen",
        },
        amount: body.amount || 1000,
        description: body.description || "Disbursement #12",
        currency: body.currency || "PHP",
        receipt_notification: body.receipt_notification || {
          email_to: ["kylemastercoder14@gmail.com", "somebody@example.co"],
          email_cc: ["somebody@example.co", "somebody@example.co"],
          email_bcc: ["somebody@example.co", "somebody@example.co"],
        },
        metadata: body.metadata || { disb: 24 },
      },
      {
        auth: {
          username:
            "xnd_development_jydaSm7ruK3UHAtluPZPDfVUadjurStJHpSJ5EK6f5swoDPfKOh9YEnjINKq4Q2", // ✅ Use environment variable
          password: "", // Required by Xendit
        },
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey, // ✅ Unique per request
        },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("Xendit API Error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data || error.message },
      { status: 500 }
    );
  }
}
