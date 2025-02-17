"use server";
import nodemailer from "nodemailer";
import { cookies } from "next/headers";
import * as jose from "jose";
import db from "@/lib/db";
import { OtpVerificationHTML } from "@/components/email-template/otp-verification";
import { WelcomeOnboardingHTML } from "@/components/email-template/welcome-onboarding";
import { SellerStatusHTML } from "@/components/email-template/seller-status-email";
import { updateBusinessType } from "@/hooks/use-seller";

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

    switch (data.category) {
      case "fashion-&-apparel":
      case "home-supplies":
      case "arts,-crafts-&-sewing":
      case "automotive":
      case "beauty-&-health":
      case "jewelry-&-accessories":
      case "pet-supplies":
      case "sports-&-outdoor":
      case "tools-&-hardwares":
      case "toys-&-games":
        await updateBusinessType(existingSeller.id, "NonFood");
        break;
      case "food-&-beverages":
        await updateBusinessType(existingSeller.id, "Food");
        break;
      case "beauty-&-personal-care-services":
      case "creative-services":
      case "education-&-training-services":
      case "event-services":
      case "health-&-wellness-services":
      case "home-services":
      case "professional-services":
      case "real-estate-services":
      case "transportation-&-logistic-services":
        await updateBusinessType(existingSeller.id, "Service");
        break;
    }

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

export const verifySeller = async (
  sellerId: string,
  reason: string,
  verify: boolean
) => {
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

    await db.seller.update({
      where: {
        id: sellerId,
      },
      data: {
        status: verify ? "Approved" : "Rejected",
      },
    });

    await sendVerificationReasonEmail(
      sellerId,
      existingSeller.name || "",
      existingSeller.email,
      reason,
      verify ? "Approved" : "Rejected"
    );

    return { success: "Seller verified successfully" };
  } catch (error) {
    console.error("Error verifying seller:", error);
    return { error: "An error occurred. Please try again later." };
  }
};

export const sendVerificationReasonEmail = async (
  sellerId: string,
  storeName: string,
  email: string,
  reason: string,
  verify: string
) => {
  const htmlContent = await SellerStatusHTML({
    sellerId,
    storeName,
    reason,
    verify,
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
    subject: `Your application has been ${verify} | 1 Market Philippines`,
    text: `Your application has been ${verify} | 1 Market Philippines`,
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

export const deleteProfileImage = async (sellerId: string) => {
  try {
    await db.seller.update({
      where: {
        id: sellerId,
      },
      data: {
        image: null,
      },
    });

    return { success: "Profile image deleted successfully" };
  } catch (error) {
    console.error("Error deleting profile image:", error);
    return { error: "An error occurred. Please try again later." };
  }
};

export const updateProfileInformation = async (
  data: {
    givenName: string;
    familyName: string;
    nationality: string;
    profileImage?: string;
  },
  sellerId: string,
  addressId: string
) => {
  try {
    await db.seller.update({
      where: {
        id: sellerId,
      },
      data: {
        givenName: data.givenName,
        familyName: data.familyName,
        sellerAddress: {
          update: {
            data: {
              nationality: data.nationality,
            },
            where: {
              id: addressId,
            },
          },
        },
        image: data.profileImage,
      },
    });

    return { success: "Profile information updated successfully" };
  } catch (error) {
    console.error("Error updating profile information:", error);
    return { error: "An error occurred. Please try again later." };
  }
};

export const createPolicies = async (
  policies: { title: string; content: string }[],
  sellerId?: string
) => {
  if (!policies || policies.length === 0) {
    return { error: "At least one policy is required" };
  }

  try {
    for (const policy of policies) {
      await db.sellerPolicies.create({
        data: {
          title: policy.title,
          content: policy.content,
          sellerId: sellerId || "",
        },
      });
    }

    return { success: "Policies added successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again" };
  }
};

export const updatePolicies = async (
  policies: { title: string; content: string }[],
  sellerId: string
) => {
  if (!policies || policies.length === 0) {
    return { error: "At least one policy is required" };
  }

  try {
    // Delete existing policies for the seller
    await db.sellerPolicies.deleteMany({
      where: {
        sellerId: sellerId,
      },
    });

    // Create new policies
    for (const policy of policies) {
      await db.sellerPolicies.create({
        data: {
          title: policy.title,
          content: policy.content,
          sellerId: sellerId,
        },
      });
    }

    return { success: "Policies updated successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again" };
  }
};

export const deletePolicy = async (policyId: string) => {
  try {
    await db.sellerPolicies.delete({
      where: {
        id: policyId,
      },
    });

    return { success: "Policy deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again" };
  }
};
