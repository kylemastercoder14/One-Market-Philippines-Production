import React from "react";
import Header from "./_components/header";
import { auth } from "@/lib/auth";

const CustomerLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const data = session?.user;
  return (
    <div>
      <Header user={data} />
      {children}
      <div>FOOTER</div>
    </div>
  );
};

export default CustomerLayout;
