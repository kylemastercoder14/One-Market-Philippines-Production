import Image from "next/image";
import React from "react";
import OnboardingForm from "../_components/onboarding-form";
import db from "@/lib/db";

const Onboarding = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <>
      <div className="max-w-4xl mx-auto py-10">
        <p className="font-semibold text-2xl">Upload Documents</p>
        <div className="bg-white shadow-sm rounded-md border mt-4 mb-4 p-3 flex items-center gap-6">
          <Image alt="Store" src="/images/store.png" width={100} height={100} />
          <div>
            <p className="text-lg font-semibold">Your shop preference</p>
            <p className="text-muted-foreground">
              Let&apos;s get started to create your shop.
            </p>
          </div>
        </div>
        <OnboardingForm categories={categories} />
      </div>
    </>
  );
};

export default Onboarding;
