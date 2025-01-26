import { NextResponse } from "next/server";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import db from "@/lib/db";
import bcryptjs from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { password, confirmPassword, passwordToken } = body;

    if (password !== confirmPassword) {
      return new NextResponse("Passwords do not match", { status: 400 });
    }

    const checkResetEmailToken =
      await getPasswordResetTokenByToken(passwordToken);

    if (checkResetEmailToken === null) {
      return new NextResponse("Token does not exist", { status: 401 });
    }

    if (passwordToken !== checkResetEmailToken?.token) {
      return new NextResponse("Invalid password reset token", { status: 401 });
    }

    const hasExpired = new Date(checkResetEmailToken.expiresAt) < new Date();

    if (hasExpired) {
      return new NextResponse("Password reset token has expired", {
        status: 401,
      });
    }

    const existingUser = await getUserByEmail(checkResetEmailToken.email);

    if (!existingUser) {
      return new NextResponse("Email does not exist", { status: 404 });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await db.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        id: existingUser.id,
      },
    });

    await db.passwordResetToken.delete({
      where: {
        id: checkResetEmailToken.id,
      },
    });

    return new NextResponse("Password updated successfully", {
      status: 201,
    });
  } catch (error) {
    console.error("Error during submission:", error);
    return new NextResponse("An error occurred", { status: 500 });
  }
}
