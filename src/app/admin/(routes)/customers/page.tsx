import React from "react";
import Heading from "@/components/ui/heading";
import db from "@/lib/db";
import { CustomerColumn } from "./_components/column";
import { format } from "date-fns";
import CategoryClient from "./_components/client";

const Customers = async () => {
  const data = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      account: true,
    },
  });

  const formattedData: CustomerColumn[] =
    data.map((item) => ({
      id: item.id,
      name: item.name || "No Name Provided",
      image: item.image || "",
      email: item.email,
      orderCount: 0,
      emailVerified: item.emailVerified?.toISOString() || "",
      type: item.account[0]?.type || "Default",
      createdAt: format(item.createdAt, "MMMM dd, yyyy hh:mm a"),
    })) || [];

  return (
    <div>
      <div className="flex md:items-center items-start gap-3 md:flex-row flex-col justify-between mb-4">
        <Heading
          title="Customer Records"
          description="View and manage a comprehensive list of all registered customers in the system. This provides key details such as names, email addresses, account types and order history ensuring efficient customer tracking and management."
        />
      </div>
      <CategoryClient data={formattedData} />
    </div>
  );
};

export default Customers;
