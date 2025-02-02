"use server";
import nodemailer from "nodemailer";
import { cookies } from "next/headers";
import * as jose from "jose";
import db from "@/lib/db";
import { OtpVerificationHTML } from "@/components/email-template/otp-verification";
import { WelcomeOnboardingHTML } from "../components/email-template/welcome-onboarding";

export const loginSeller = async (email: string, password: string) => {
  try {
    const seller = await db.seller.findFirst({
      where: {
        email,
      },
    });

    if (!seller) {
      return { error: "No seller account found." };
    }

    if (seller.password !== password) {
      return { error: "Invalid password" };
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";

    const jwt = await new jose.SignJWT({})
      .setProtectedHeader({ alg })
      .setExpirationTime("72h")
      .setSubject(seller.id.toString())
      .sign(secret);

    (
      await // Set the cookie with the JWT
      cookies()
    ).set("Authorization", jwt, {
      httpOnly: true, // Set to true for security
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 60 * 60 * 24 * 3, // Cookie expiration (3 days in seconds)
      sameSite: "strict", // Adjust according to your needs
      path: "/", // Adjust path as needed
    });

    return { token: jwt, seller: seller.id };
  } catch (error) {
    console.error("Error logging in:", error);
    return { error: "Failed to login." };
  }
};

export const logoutSeller = async () => {
  (await cookies()).set("Authorization", "", { maxAge: 0, path: "/" });
};

export const sendOtpCode = async (email: string) => {
  const otpCode = Math.floor(100000 + Math.random() * 900000);

  try {
    const existingSeller = await db.seller.findFirst({
      where: {
        email,
      },
    });

    if (existingSeller) {
      await db.seller.update({
        where: {
          id: existingSeller.id,
        },
        data: {
          otpCode: otpCode.toString(),
        },
      });
    } else {
      await db.seller.create({
        data: {
          email,
          otpCode: otpCode.toString(),
        },
      });
    }

    await sendOtpCodeEmail(otpCode.toString(), email);

    return { success: "OTP code sent successfully" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred. Please try again later." };
  }
};

export const sendOtpCodeEmail = async (otpCode: string, email: string) => {
  const htmlContent = await OtpVerificationHTML({
    otpCode,
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
    subject: "Verify your email address",
    text: `Your OTP code is ${otpCode}`,
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

export const createSeller = async (data: {
  email: string;
  emailVerificationCode: string;
  password: string;
  confirmPassword: string;
}) => {
  if (
    !data.email ||
    !data.emailVerificationCode ||
    !data.password ||
    !data.confirmPassword
  ) {
    return { error: "Please fill in all required fields" };
  }

  if (data.password !== data.confirmPassword) {
    return { error: "Passwords do not match" };
  }

  try {
    const existingSeller = await db.seller.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!existingSeller) {
      return { error: "Invalid email address" };
    }

    if (existingSeller?.otpCode !== data.emailVerificationCode) {
      return { error: "Invalid OTP code" };
    }

    await db.seller.update({
      where: {
        id: existingSeller.id,
      },
      data: {
        password: data.password,
      },
    });

    return { success: "Account created successfully", seller: existingSeller };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred. Please try again later." };
  }
};

export const finishingSellerData = async (
  data: {
    businessType: string;
    shopName: string;
    category: string;
    identityType: string;
    identity: string;
    dti: string;
    sec: string;
    bir: string;
    barangayBusinessPermit: string;
    givenName: string;
    middleName: string;
    familyName: string;
  },
  email: string
) => {
  try {
    const existingSeller = await db.seller.findFirst({
      where: {
        email,
      },
    });

    if (!existingSeller) {
      return { error: "No account found" };
    }

    await db.seller.update({
      where: {
        id: existingSeller.id,
      },
      data: {
        name: data.shopName,
        categorySlug: data.category,
        type: data.businessType,
        identityType: data.identityType,
        dti: data.dti,
        bir: data.bir,
        sec: data.sec,
        givenName: data.givenName,
        barangayBusinessPermit: data.barangayBusinessPermit,
        middleName: data.middleName,
        familyName: data.familyName,
        identity: data.identity,
      },
    });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";

    const jwt = await new jose.SignJWT({})
      .setProtectedHeader({ alg })
      .setExpirationTime("72h")
      .setSubject(existingSeller.id.toString())
      .sign(secret);

    (
      await // Set the cookie with the JWT
      cookies()
    ).set("Authorization", jwt, {
      httpOnly: true, // Set to true for security
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 60 * 60 * 24 * 3, // Cookie expiration (3 days in seconds)
      sameSite: "strict", // Adjust according to your needs
      path: "/", // Adjust path as needed
    });

    await sendWelcomeEmail(existingSeller.id, data.shopName, email);

    return { success: "Account created successfully", seller: existingSeller };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred. Please try again later." };
  }
};

export const sendWelcomeEmail = async (
  sellerId: string,
  storeName: string,
  email: string
) => {
  const htmlContent = await WelcomeOnboardingHTML({
    sellerId,
    storeName,
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
    subject: "Welcome to 1 Market Philippines | Seller Hub",
    text: `Welcome to 1 Market Philippines | Seller Hub`,
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

export const finishSettingUpSeller = async (
  nationality: string,
  residentialAddress: string,
  streetAddress: string,
  contactPerson: string,
  phoneNumber: string,
  isReturnRefundAddress: boolean,
  sellerId: string
) => {
  if (
    !residentialAddress ||
    !streetAddress ||
    !contactPerson ||
    !phoneNumber ||
    !nationality
  ) {
    return { error: "Please fill in all required fields" };
  }

  if (!sellerId) {
    return { error: "Invalid seller ID" };
  }

  try {
    const existingSeller = await db.seller.findUnique({
      where: {
        id: sellerId,
      },
    });

    if (!existingSeller) {
      return { error: "Seller not found" };
    }

    const completeAddress = `${residentialAddress}, ${streetAddress}`;

    await db.sellerAddress.create({
      data: {
        sellerId,
        residentialAddress: completeAddress,
        contactPerson,
        contactNumber: phoneNumber,
        nationality,
        isReturnAddress: isReturnRefundAddress,
      },
    });

    return { success: "Seller setup completed" };
  } catch (error) {
    console.error("Error finishing seller setup:", error);
    return { error: "An error occurred. Please try again later." };
  }
};

export const updateSellerProfile = async (
  values: {
    storeName: string;
    email: string;
    givenName: string;
    middleName?: string;
    familyName: string;
  },
  sellerId: string
) => {
  try {
    await db.seller.update({
      where: {
        id: sellerId,
      },
      data: {
        name: values.storeName,
        email: values.email,
        givenName: values.givenName,
        middleName: values.middleName,
        familyName: values.familyName,
      },
    });
  } catch (error) {
    console.error("Error updating seller profile:", error);
  }
};

export const updateSellerBilling = async (
  values: {
    nationality: string;
    contactPerson: string;
    contactNumber: string;
    residentialAddress: string;
  },
  addressId: string
) => {
  try {
    await db.sellerAddress.update({
      where: {
        id: addressId,
      },
      data: {
        residentialAddress: values.residentialAddress,
        contactPerson: values.contactPerson,
        contactNumber: values.contactNumber,
        nationality: values.nationality,
      },
    });
  } catch (error) {
    console.error("Error updating seller billing:", error);
  }
};
