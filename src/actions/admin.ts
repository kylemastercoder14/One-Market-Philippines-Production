"use server";

import { cookies } from "next/headers";
import * as jose from "jose";
import db from "@/lib/db";

export const loginAdmin = async (email: string, password: string) => {
  try {
    const admin = await db.admin.findFirst({
      where: {
        email,
      },
    });

    if (!admin) {
      return { error: "No admin account found." };
    }

    if (admin.password !== password) {
      return { error: "Invalid password" };
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";

    const jwt = await new jose.SignJWT({})
      .setProtectedHeader({ alg })
      .setExpirationTime("72h")
      .setSubject(admin.id.toString())
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

    return { token: jwt, admin: admin.id };
  } catch (error) {
    console.error("Error logging in:", error);
    return { error: "Failed to login." };
  }
};

export const logoutAdmin = async () => {
  (await cookies()).set("Authorization", "", { maxAge: 0, path: "/" });
};

export const updatePlatformName = async (brandName: string, id: string) => {
  try {
    await db.adminSettings.update({
      where: {
        id: id,
      },
      data: {
        brandName,
      },
    });

    return true;
  } catch (error) {
    console.error("Error updating platform name:", error);
    return false;
  }
};

export const createPlatformName = async (brandName: string) => {
  try {
    await db.adminSettings.create({
      data: {
        brandName,
      },
    });

    return true;
  } catch (error) {
    console.error("Error creating platform name:", error);
    return false;
  }
};

export const updateAddress = async (address: string, id: string) => {
  try {
    await db.adminSettings.update({
      where: {
        id: id,
      },
      data: {
        address,
      },
    });

    return true;
  } catch (error) {
    console.error("Error updating address:", error);
    return false;
  }
};

export const createAddress = async (address: string) => {
  try {
    await db.adminSettings.create({
      data: {
        address,
      },
    });

    return true;
  } catch (error) {
    console.error("Error creating address:", error);
    return false;
  }
};

export const createDescription = async (description: string) => {
  try {
    await db.adminSettings.create({
      data: {
        description,
      },
    });

    return true;
  } catch (error) {
    console.error("Error creating description:", error);
    return false;
  }
};

export const updateDescription = async (description: string, id: string) => {
  try {
    await db.adminSettings.update({
      where: {
        id: id,
      },
      data: {
        description,
      },
    });

    return true;
  } catch (error) {
    console.error("Error updating description:", error);
    return false;
  }
};

export const updateCommision = async (commision: number, id: string) => {
  try {
    await db.adminSettings.update({
      where: {
        id: id,
      },
      data: {
        commision,
      },
    });

    return true;
  } catch (error) {
    console.error("Error updating commision:", error);
    return false;
  }
};

export const createCommision = async (commision: number) => {
  try {
    await db.adminSettings.create({
      data: {
        commision,
      },
    });

    return true;
  } catch (error) {
    console.error("Error creating commision:", error);
    return false;
  }
};

export const updateDateEstablished = async (
  dateEstablished: Date,
  id: string
) => {
  try {
    await db.adminSettings.update({
      where: {
        id: id,
      },
      data: {
        dateEstablished: dateEstablished.toISOString(),
      },
    });

    return true;
  } catch (error) {
    console.error("Error updating date established:", error);
    return false;
  }
};

export const createDateEstablished = async (dateEstablished: Date) => {
  try {
    await db.adminSettings.create({
      data: {
        dateEstablished: dateEstablished.toISOString(),
      },
    });

    return true;
  } catch (error) {
    console.error("Error creating date established:", error);
    return false;
  }
};

export const updateContactNumber = async (
  contactNumber: string,
  id: string
) => {
  try {
    await db.adminSettings.update({
      where: {
        id: id,
      },
      data: {
        contactNumber,
      },
    });

    return true;
  } catch (error) {
    console.error("Error updating contact number:", error);
    return false;
  }
};

export const createContactNumber = async (contactNumber: string) => {
  try {
    await db.adminSettings.create({
      data: {
        contactNumber,
      },
    });

    return true;
  } catch (error) {
    console.error("Error creating contact number:", error);
    return false;
  }
};

export const createLogo = async (logo: string) => {
  try {
    await db.adminSettings.create({
      data: { logo },
    });
    return true;
  } catch (error) {
    console.error("Error creating logo:", error);
    return { success: false, error };
  }
};

export const updateLogo = async (logo: string, id: string) => {
  try {
    await db.adminSettings.update({
      where: { id },
      data: { logo },
    });
    return true;
  } catch (error) {
    console.error("Error updating logo:", error);
    return { success: false, error };
  }
};

export const updatePrivacyPolicy = async (privacy: string, id: string) => {
  try {
    await db.adminPolicies.update({
      where: {
        id: id,
      },
      data: {
        privacy,
      },
    });

    return true;
  } catch (error) {
    console.error("Error updating privacy policy:", error);
    return false;
  }
};

export const createPrivacyPolicy = async (privacy: string) => {
  try {
    await db.adminPolicies.create({
      data: {
        privacy,
      },
    });

    return true;
  } catch (error) {
    console.error("Error creating privacy policy:", error);
    return false;
  }
};

export const updateRefundPolicy = async (refund: string, id: string) => {
  try {
    await db.adminPolicies.update({
      where: {
        id: id,
      },
      data: {
        refund,
      },
    });

    return true;
  } catch (error) {
    console.error("Error updating refund policy:", error);
    return false;
  }
};

export const createRefundPolicy = async (refund: string) => {
  try {
    await db.adminPolicies.create({
      data: {
        refund,
      },
    });

    return true;
  } catch (error) {
    console.error("Error creating refund policy:", error);
    return false;
  }
};

export const updateTermsPolicy = async (terms: string, id: string) => {
  try {
    await db.adminPolicies.update({
      where: {
        id: id,
      },
      data: {
        terms,
      },
    });

    return true;
  } catch (error) {
    console.error("Error updating terms and condition policy:", error);
    return false;
  }
};

export const createTermsPolicy = async (terms: string) => {
  try {
    await db.adminPolicies.create({
      data: {
        terms,
      },
    });

    return true;
  } catch (error) {
    console.error("Error creating terms and condition policy:", error);
    return false;
  }
};

export const updateIntellectualPolicy = async (
  intellectual: string,
  id: string
) => {
  try {
    await db.adminPolicies.update({
      where: {
        id: id,
      },
      data: {
        intellectualProperty: intellectual,
      },
    });

    return true;
  } catch (error) {
    console.error("Error updating intellectual property policy:", error);
    return false;
  }
};

export const createIntellectualPolicy = async (intellectual: string) => {
  try {
    await db.adminPolicies.create({
      data: {
        intellectualProperty: intellectual,
      },
    });

    return true;
  } catch (error) {
    console.error("Error creating intellectual property policy:", error);
    return false;
  }
};

export const viewAllSettingsData = async () => {
  try {
    const settings = await db.adminSettings.findMany();
    return settings;
  } catch (error) {
    console.error("Error fetching settings data:", error);
    return [];
  }
};
