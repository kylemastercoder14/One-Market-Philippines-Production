"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

const GoogleLogin = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "You have already signed up with this email"
      : "Failed to sign in with Google";
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const handleSignin = async () => {
    setIsSubmitting(true);
    try {
      await signIn("google");
    } catch (error) {
      toast.error(urlError);
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
          src="https://aimg.kwcdn.com/upload_aimg/login/8e2e59cd-5090-4feb-ae78-691e9971ed89.png.slim.png?imageView2/2/w/72/q/80/format/webp"
          alt="Google"
          width={40}
          height={40}
        />
      )}
    </Button>
  );
};

export default GoogleLogin;
