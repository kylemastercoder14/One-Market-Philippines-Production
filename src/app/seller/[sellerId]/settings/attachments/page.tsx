import React from "react";
import Heading from "@/components/ui/heading";
import db from "@/lib/db";
import AttachmentsClient from './client';

const SellerAttachments = async (props: {
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
      <AttachmentsClient seller={seller} />
    </div>
  );
};

export default SellerAttachments;
