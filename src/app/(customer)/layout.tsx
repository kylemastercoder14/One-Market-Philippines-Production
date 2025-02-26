import React from "react";
import Header from "./_components/header";
import { auth } from "@/lib/auth";
import Footer from './_components/footer';
import Chatbot from '@/components/globals/chatbot';
import db from '@/lib/db';

const CustomerLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const data = session?.user;
  const user = await db.user.findUnique({
    where: {
      email: data?.email ?? "",
    },
  });
  return (
    <div>
      <Header user={user} />
      {children}
      <Footer />
      <Chatbot userId={user?.id as string} />
    </div>
  );
};

export default CustomerLayout;
