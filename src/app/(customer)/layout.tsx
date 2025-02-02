import React from "react";
import Header from "./_components/header";
import { auth } from "@/lib/auth";
import Footer from './_components/footer';

const CustomerLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const data = session?.user;
  return (
    <div>
      <Header user={data} />
      {children}
      <Footer />
    </div>
  );
};

export default CustomerLayout;
