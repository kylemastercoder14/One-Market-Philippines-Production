import { NextResponse } from "next/server";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { generateTwoFactorToken } from "@/lib/tokens";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import db from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, code } = body;

    const existingUser = await getUserByEmail(email);

    if (!existingUser?.emailVerified) {
      const verificationToken = await getVerificationTokenByEmail(email);
      await sendVerificationEmail(
        verificationToken?.email as string,
        verificationToken?.token as string
      );

      return new NextResponse("Email not verified", {
        status: 401,
        statusText: "Email not verified",
      });
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
      if (code) {
        // validate the two factor token
        const twoFactorToken = await getTwoFactorTokenByEmail(
          existingUser.email
        );
        if (!twoFactorToken) {
          return new NextResponse("Invalid two factor token", {
            status: 401,
            statusText: "Invalid two factor token",
          });
        }

        if (twoFactorToken.token !== code) {
          return new NextResponse("Invalid code", {
            status: 401,
            statusText: "Invalid code",
          });
        }

        const expiresAt = new Date(twoFactorToken.expiresAt) < new Date();

        if (expiresAt) {
          return new NextResponse("Two factor token expired", {
            status: 401,
            statusText: "Two factor token expired",
          });
        }

        await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });

        const existingConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (existingConfirmation) {
          await db.twoFactorConfirmation.delete({
            where: { id: existingConfirmation.id },
          });
        }

        await db.twoFactorConfirmation.create({
          data: {
            userId: existingUser.id,
          },
        });
      } else {
        const twoFactorToken = await generateTwoFactorToken(existingUser.email);
        await sendTwoFactorTokenEmail(
          twoFactorToken.email,
          twoFactorToken.token
        );

        // return the two factor token to the user to true
        return new NextResponse("Two factor token sent", {
          status: 203,
          statusText: "Two factor token sent",
        });
      }
    }

    await signIn("credentials", { email, password, redirectTo: "/" });

    return new NextResponse("Login successfully", {
      status: 200,
      statusText: "Login successfully",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return new NextResponse("Invalid credentials", {
            status: 401,
            statusText: "Invalid credentials",
          });
        default:
          return new NextResponse("An error occurred", {
            status: 500,
            statusText: "An error occurred",
          });
      }
    }

    throw error;
  }
}
