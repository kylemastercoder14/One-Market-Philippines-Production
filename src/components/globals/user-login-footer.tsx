import Link from "next/link";
import React from "react";
import GoogleLogin from "./google-login";
import FacebookLogin from "./facebook-login";

const UserLoginFooter = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex flex-col">
      <span
        onClick={onClick}
        className="cursor-pointer text-sm mt-3 text-muted-foreground underline hover:text-muted-foreground/80 text-center"
      >
        Trouble signing in?
      </span>
      <span className="text-sm mt-7 text-muted-foreground text-center">
        Or continue with other ways
      </span>
      <div className="flex items-center gap-5 justify-center mt-4">
        <GoogleLogin />
        <FacebookLogin />
      </div>
      <span className="text-sm mt-7 text-center">
        By continuing, you agree to our{" "}
        <Link
          href="/terms"
          className="underline cursor-pointer text-orange-600"
        >
          Terms of Use
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="underline cursor-pointer text-orange-600"
        >
          Privacy Policy
        </Link>
      </span>
    </div>
  );
};

export default UserLoginFooter;
