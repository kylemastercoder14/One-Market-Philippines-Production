import { NextResponse } from "next/server";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetTokenEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    const formattedDate = new Date().toLocaleString();
    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetTokenEmail(
      email,
      passwordResetToken.token,
      formattedDate
    );

    return new NextResponse("Password reset token sent", { status: 200 });
  } catch (error) {
    console.error("Error during submission:", error);
    return new NextResponse("An error occurred", { status: 500 });
  }
}
