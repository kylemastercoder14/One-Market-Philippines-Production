import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import db from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(newUser.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("[USER_POST_REGISTER_ERROR]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
