import React from "react";
import Heading from "@/components/ui/heading";
import SettingsClient from "./_components/client";
import db from "@/lib/db";

const SellerSettings = async (props: {
  params: Promise<{
    sellerId: string;
  }>;
}) => {
  const params = await props.params;
  const seller = await db.seller.findUnique({
    where: {
      id: params.sellerId,
    },
    include: {
      sellerAddress: true,
      sellerBank: true,
    },
  });
  return (
    <div>
      <Heading
        title="Settings"
        description="Manage your account settings, policies, payment accounts, and appearance."
      />
      <SettingsClient seller={seller} />
    </div>
  );
};

export default SellerSettings;
