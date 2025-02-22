import React from "react";
import Header from "./_components/header";
import { auth } from "@/lib/auth";
import Footer from './_components/footer';
import Chatbot from '@/components/globals/chatbot';

const CustomerLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const data = session?.user;
  return (
    <div>
      <Header user={data} />
      {children}
      <Footer />
      <Chatbot userId={data?.id as string} />
    </div>
  );
};

export default CustomerLayout;
