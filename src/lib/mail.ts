import nodemailer from "nodemailer";
import { VerificationEmailHTML } from "@/components/email-template/verification-email";
import { ResetPasswordEmailHTML } from "@/components/email-template/reset-password-email";
import { TwoFactorEmailHTML } from "@/components/email-template/two-factor-email";

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const htmlContent = await TwoFactorEmailHTML({
    token,
    email,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "onemarketphilippines2025@gmail.com",
      pass: "vrbscailgpflucvn",
    },
  });

  const message = {
    from: "onemarketphilippines2025@gmail.com",
    to: email,
    subject: "Two Factor Authentication Code",
    text: `Your two factor authentication code is: ${token}`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(message);

    return { success: "Email has been sent." };
  } catch (error) {
    console.error("Error sending notification", error);
    return { message: "An error occurred. Please try again." };
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `https://one-market-philippines-production.vercel.app?token=${token}`;

  const htmlContent = await VerificationEmailHTML({
    confirmLink,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "onemarketphilippines2025@gmail.com",
      pass: "vrbscailgpflucvn",
    },
  });

  const message = {
    from: "onemarketphilippines2025@gmail.com",
    to: email,
    subject: "Confirm your email address",
    text: `Click this link to confirm your email address: ${confirmLink}`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(message);

    return { success: "Email has been sent." };
  } catch (error) {
    console.error("Error sending notification", error);
    return { message: "An error occurred. Please try again." };
  }
};

export const sendPasswordResetTokenEmail = async (
  email: string,
  token: string,
  formattedDate: string
) => {
  const confirmLink = `https://one-market-philippines-production.vercel.app?passwordToken=${token}`;

  const htmlContent = await ResetPasswordEmailHTML({
    confirmLink,
    email,
    formattedDate,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "onemarketphilippines2025@gmail.com",
      pass: "vrbscailgpflucvn",
    },
  });

  const message = {
    from: "onemarketphilippines2025@gmail.com",
    to: email,
    subject: "Reset your password",
    text: `Click this link to reset your password: ${confirmLink}`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(message);

    return { success: "Email has been sent." };
  } catch (error) {
    console.error("Error sending notification", error);
    return { message: "An error occurred. Please try again." };
  }
};
