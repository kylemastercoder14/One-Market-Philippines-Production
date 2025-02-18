"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";

const SuccessPage = () => {
  const { removeAll } = useCart();
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <Image src="/images/success.svg" alt="Success" height={500} width={500} />
      <h1 className="font-semibold text-xl mt-4">Your payment is successful</h1>
      <p className="text-muted-foreground mt-1 mb-5">
        Thank you for your payment and trust with 1 Market Philippines. An
        automated payment receipt will be sent to your registered email.
      </p>
      <Link href="/">
        <Button onClick={removeAll}>Back to homepage &rarr;</Button>
      </Link>
    </div>
  );
};

export default SuccessPage;
