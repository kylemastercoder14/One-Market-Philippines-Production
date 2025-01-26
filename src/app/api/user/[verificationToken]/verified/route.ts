import { NextResponse } from "next/server";
import { getVerificationTokenByToken } from "@/data/verification-token";
import db from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export async function POST(
  req: Request,
  { params }: { params: { verificationToken: string } }
) {
  try {
    const checkVerificationToken = await getVerificationTokenByToken(
      params.verificationToken
    );

    if (checkVerificationToken === null) {
      return new NextResponse("Token does not exist", { status: 401 });
    }

    if (params.verificationToken !== checkVerificationToken?.token) {
      return new NextResponse("Invalid verification token", { status: 401 });
    }

    const hasExpired = new Date(checkVerificationToken.expiresAt) < new Date();

    if (hasExpired) {
      return new NextResponse("Verification token has expired", {
        status: 401,
      });
    }

    const existingUser = await getUserByEmail(checkVerificationToken.email);

    if (!existingUser) {
      return new NextResponse("Email does not exist", { status: 404 });
    }

    await db.user.update({
      data: {
        emailVerified: new Date(),
        email: existingUser.email,
      },
      where: {
        id: existingUser.id,
      },
    });

    await db.verificationToken.delete({
      where: {
        id: checkVerificationToken.id,
      },
    });

    return new NextResponse("User verified successfully. You can login now", {
      status: 201,
    });
  } catch (error) {
    console.error("Error during submission:", error);
    return new NextResponse("An error occurred", { status: 500 });
  }
}
