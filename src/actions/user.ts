"use server";

import { getVerificationTokenByToken } from "@/data/verification-token";
import { getUserByEmail } from "@/data/user";
import db from "@/lib/db";
import { auth } from "../lib/auth";

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

export const updateUserName = async (name: string, id: string) => {
  if (!id) {
    return { error: "User ID is required to update account" };
  }

  try {
    await db.user.update({
      data: {
        name,
      },
      where: {
        id,
      },
    });

    return { success: "Profile updated successfully" };
  } catch (error) {
    console.error("Error during submission:", error);
    return { error: "An error occurred during updating name" };
  }
};

export const updateUserImage = async (image: string, id: string) => {
  if (!id) {
    return { error: "User ID is required to update account" };
  }

  try {
    await db.user.update({
      data: {
        image,
      },
      where: {
        id,
      },
    });

    return { success: "Profile updated successfully" };
  } catch (error) {
    console.error("Error during submission:", error);
    return { error: "An error occurred during updating name" };
  }
};

export const createAddress = async (values: {
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
  region: string;
  province: string;
  municipality: string;
  barangay: string;
  phoneNumber: string;
  isDefaultAddress: boolean;
}) => {
  const session = await auth();
  const data = session?.user;

  if (!data) {
    return { error: "User not found" };
  }
  try {
    if (values.isDefaultAddress) {
      await db.address.updateMany({
        where: {
          userId: data.id,
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      });
    }

    const address = await db.address.create({
      data: {
        firstName: values.firstName,
        lastName: values.lastName,
        homeAddress: values.address,
        zipCode: values.postalCode,
        region: values.region,
        province: values.province,
        city: values.municipality,
        barangay: values.barangay,
        contactNumber: values.phoneNumber,
        isDefault: values.isDefaultAddress,
        userId: data.id as string,
      },
    });

    return { success: "Address created successfully", address };
  } catch (error) {
    console.error("Error during submission:", error);
    return { error: "An error occurred during address creation" };
  }
};

export const updateAddress = async (
  values: {
    firstName: string;
    lastName: string;
    address: string;
    postalCode: string;
    region: string;
    province: string;
    municipality: string;
    barangay: string;
    phoneNumber: string;
    isDefaultAddress: boolean;
  },
  addressId: string
) => {
  const session = await auth();
  const data = session?.user;

  if (!data) {
    return { error: "User not found" };
  }

  try {
    if (values.isDefaultAddress) {
      await db.address.updateMany({
        where: {
          userId: data.id,
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      });
    }

    const address = await db.address.update({
      where: {
        id: addressId,
      },
      data: {
        firstName: values.firstName,
        lastName: values.lastName,
        homeAddress: values.address,
        zipCode: values.postalCode,
        region: values.region,
        province: values.province,
        city: values.municipality,
        barangay: values.barangay,
        contactNumber: values.phoneNumber,
        isDefault: values.isDefaultAddress,
      },
    });

    return { success: "Address updated successfully", address };
  } catch (error) {
    console.error("Error during submission:", error);
    return { error: "An error occurred during address update" };
  }
};

export const setDefaultAddress = async (addressId: string) => {
  const session = await auth();
  const data = session?.user;

  if (!data) {
    return { error: "User not found" };
  }

  try {
    await db.address.updateMany({
      where: {
        userId: data.id,
        isDefault: true,
      },
      data: {
        isDefault: false,
      },
    });

    await db.address.update({
      where: {
        id: addressId,
      },
      data: {
        isDefault: true,
      },
    });

    return { success: "Default address updated" };
  } catch (error) {
    console.error("Error during submission:", error);
    return { error: "An error occurred during setting default address" };
  }
};

export const deleteAddress = async (addressId: string) => {
  try {
    await db.address.delete({
      where: {
        id: addressId,
      },
    });

    return { success: "Address deleted successfully" };
  } catch (error) {
    console.error("Error during submission:", error);
    return { error: "An error occurred during address deletion" };
  }
};

export const fetchDefaultAddress = async () => {
  const session = await auth();
  const data = session?.user;

  if (!data) {
    return { error: "User not found" };
  }

  try {
    const address = await db.address.findFirst({
      where: {
        userId: data.id,
        isDefault: true,
      },
    });

    return { success: "Default address fetched", address };
  } catch (error) {
    console.error("Error during submission:", error);
    return { error: "An error occurred during fetching default address" };
  }
};

export const fetchAllAddresses = async () => {
  const session = await auth();
  const data = session?.user;

  if (!data) {
    return { error: "User not found" };
  }

  try {
    const addresses = await db.address.findMany({
      where: {
        userId: data.id,
      },
    });

    return { success: "All addresses fetched", addresses };
  } catch (error) {
    console.error("Error during submission:", error);
    return { error: "An error occurred during fetching all addresses" };
  }
};
