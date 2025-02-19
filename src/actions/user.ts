"use server";

import { getVerificationTokenByToken } from "@/data/verification-token";
import { getUserByEmail } from "@/data/user";
import db from "@/lib/db";

export const verifiedUser = async (token: string) => {
  try {
    const checkVerificationToken = await getVerificationTokenByToken(token);

    if (checkVerificationToken === null) {
      return { error: "Token does not exist" };
    }

    if (token !== checkVerificationToken?.token) {
      return { error: "Invalid verification token" };
    }

    const hasExpired = new Date(checkVerificationToken.expiresAt) < new Date();

    if (hasExpired) {
      return { error: "Verification token has expired" };
    }

    const existingUser = await getUserByEmail(checkVerificationToken.email);

    if (!existingUser) {
      return { error: "Email does not exist" };
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

    return { success: "User verified successfully. You can login now" };
  } catch (error) {
    console.error("Error during submission:", error);
    return { error: "An error occurred during verification" };
  }
};
