"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

const FacebookLogin = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const handleSignin = async () => {
    setIsSubmitting(true);
    try {
      await signIn("facebook");
    } catch (error) {
      toast.error("Failed to sign in with Facebook");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Button
      disabled={isSubmitting}
      onClick={handleSignin}
      variant="ghost"
      size="icon"
    >
      {isSubmitting ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Image
          src="/icons/facebook.svg"
          alt="Facebook"
          width={40}
          height={40}
        />
      )}
    </Button>
  );
};

export default FacebookLogin;
