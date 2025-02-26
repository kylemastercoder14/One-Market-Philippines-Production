import React from "react";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import AddressClient from "./client";

const Addresses = async () => {
  const session = await auth();
  const data = session?.user;
  const addresses = await db.address.findMany({
    where: {
      userId: data?.id,
    }
  });
  return <>{data && <AddressClient data={addresses} />}</>;
};

export default Addresses;
