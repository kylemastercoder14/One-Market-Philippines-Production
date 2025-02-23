"use server";

import db from "@/lib/db";

export const submitReportSuspicious = async (
  values: {
    howWereYouContacted: string;
    suspiciousEmail: string;
    platformSuspicious: string;
    lostOfAsset: string;
    description: string;
    screenShot: string;
  },
  userId: string
) => {
  if (!userId) {
    return { error: "You must be logged in to submit report." };
  }

  try {
    await db.reportSuspicious.create({
      data: {
        howWereYouContacted: values.howWereYouContacted,
        suspiciousEmail: values.suspiciousEmail,
        platformSuspicious: values.platformSuspicious,
        lostOfAsset: values.lostOfAsset,
        description: values.description,
        screenShot: values.screenShot,
        userId: userId,
      },
    });

    return { success: "Report submitted successfully." };
  } catch (error) {
    console.error("Error submitting report:", error);
    return { error: "An error occurred while submitting report." };
  }
};

export const submitFakeWebsite = async (
  values: {
    suspiciousLink: string;
    submitPersonalInfo: string[];
    lostOfAsset: string;
    description: string;
    screenShot: string;
  },
  userId: string
) => {
  if (!userId) {
    return { error: "You must be logged in to submit report." };
  }

  try {
    await db.reportSuspicious.create({
      data: {
        suspiciousLink: values.suspiciousLink,
        submitPersonalInfo: values.submitPersonalInfo,
        lostOfAsset: values.lostOfAsset,
        description: values.description,
        screenShot: values.screenShot,
        userId: userId,
      },
    });

    return { success: "Report submitted successfully." };
  } catch (error) {
    console.error("Error submitting report:", error);
    return { error: "An error occurred while submitting report." };
  }
};

export const submitFakeJob = async (
  values: {
    howWereYouContacted: string;
    others: string;
    suspiciousLink: string;
    lostOfAsset: string;
    description: string;
    screenShot: string;
  },
  userId: string
) => {
  if (!userId) {
    return { error: "You must be logged in to submit report." };
  }

  try {
    const howWereYouContacted =
      values.howWereYouContacted === "Others"
        ? values.others
        : values.howWereYouContacted;
    await db.reportSuspicious.create({
      data: {
        howWereYouContacted: howWereYouContacted,
        suspiciousLink: values.suspiciousLink,
        lostOfAsset: values.lostOfAsset,
        description: values.description,
        screenShot: values.screenShot,
        userId: userId,
      },
    });

    return { success: "Report submitted successfully." };
  } catch (error) {
    console.error("Error submitting report:", error);
    return { error: "An error occurred while submitting report." };
  }
};
