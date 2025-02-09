import db from "@/lib/db";
import React from "react";

const SpecificSeller = async (props: {
  params: Promise<{
    sellerId: string;
  }>;
}) => {
  const params = await props.params;
  const seller = await db.seller.findUnique({
    where: {
      id: params.sellerId,
    },
  });
  return <div>{seller?.name}</div>;
};

export default SpecificSeller;
