/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ChevronLeft, User } from "lucide-react";
import React, { useCallback, useState } from "react";
import { Modal } from "@/components/ui/modal";
import EncryptedBanner from "@/components/globals/encryted-banner";
import UserForm from "@/components/forms/user-form";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import FormSuccess from "@/components/globals/form-success";
import FormError from "@/components/globals/form-error";
import UserLoginFooter from "@/components/globals/user-login-footer";
import { Button } from "@/components/ui/button";
import ForgotPasswordForm from "@/components/forms/forgot-password-form";
import ResetPasswordForm from "@/components/forms/reset-password-form";

const UserLogin = () => {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [showTroubleSignIn, setShowTroubleSignIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const [isConfirming, setIsConfirming] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const token = searchParams.get("token");
  const passwordToken = searchParams.get("passwordToken");

  const verifyEmail = useCallback(async () => {
    if (success || error) return;
    setIsConfirming(true);
    setShowLogin(false);
    try {
      const response = await axios.post(`/api/user/${token}/verified`);
      setSuccess(response.data);
      window.location.assign("/");
    } catch (error: any) {
      console.error("Error during email verification:", error);
      setError(
        error.response?.data || "An error occurred. Please try again later."
      );
    } finally {
      setTimeout(() => {
        setIsConfirming(false);
      }, 5000);
    }
  }, [token, success, error]);

  React.useEffect(() => {
    if (searchParams.has("token")) verifyEmail();
  }, [verifyEmail]);

  React.useEffect(() => {
    if (searchParams.has("passwordToken")) setIsResettingPassword(true);
  }, [setIsResettingPassword]);

  return (
    <>
      <Modal
        className="p-0"
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      >
        {showLoginForm && (
          <div className="p-5">
            <h3 className="font-semibold text-center">Sign in / Register</h3>
            <EncryptedBanner />
            <UserForm />
            <UserLoginFooter
              onClick={() => {
                setShowTroubleSignIn(true);
                setShowLoginForm(false);
              }}
            />
          </div>
        )}

        {showTroubleSignIn && (
          <div className="p-2">
            <Button
              onClick={() => {
                setShowTroubleSignIn(false);
                setShowLoginForm(true);
              }}
              variant="ghost"
              className="flex items-center"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="p-5">
              <h3 className="font-semibold text-lg text-center">
                Trouble signing in?
              </h3>
              <p className="text-sm mt-4 text-center">
                If you registered an account with your email address, but forgot
                your password, you can reset your password.
              </p>
              <Button
                onClick={() => {
                  setShowForgotPassword(true);
                  setShowTroubleSignIn(false);
                }}
                variant="default"
                className="w-full mt-3"
              >
                Reset your password
              </Button>
              <p className="text-sm mt-10 text-center">
                If you forgot your account, you can try to find your account by
                email, mobile phone number or Order ID.
              </p>
              <Button
                onClick={() => router.push("/find-your-account")}
                variant="outline"
                className="w-full mt-3"
              >
                Find your account
              </Button>
            </div>
          </div>
        )}

        {showForgotPassword && (
          <div className="p-2">
            <Button
              onClick={() => {
                setShowTroubleSignIn(true);
                setShowForgotPassword(false);
              }}
              variant="ghost"
              className="flex items-center"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="p-5">
              <h3 className="font-semibold text-lg text-center">
                Forgot your password?
              </h3>
              <p className="text-sm mt-3 text-center">
                Enter your email address below, and we&apos;ll send you a link
                to reset your password.
              </p>
              <ForgotPasswordForm />
            </div>
          </div>
        )}
      </Modal>
      <Modal isOpen={isConfirming} onClose={() => setIsConfirming(false)}>
        <div className="flex flex-col items-center gap-4 justify-center">
          <h3 className="font-semibold text-center">
            Confirming your verification
          </h3>
          {!success && !error && <BeatLoader className="text-center" />}
          {success && <FormSuccess message={success} />}
          {error && <FormError message={error} />}
        </div>
      </Modal>
      <Modal
        className="p-0"
        isOpen={isResettingPassword}
        onClose={() => {
          setIsResettingPassword(false);
          router.push("/");
        }}
      >
        <div className="p-5">
          <h3 className="font-semibold text-center">Reset your password</h3>
          <EncryptedBanner />
          <ResetPasswordForm passwordToken={passwordToken || ""} />
        </div>
      </Modal>
      <div className="relative group">
        <button
          onClick={() => setShowLogin(true)}
          className="px-4 flex items-center gap-2 py-2 rounded-2xl hover:bg-zinc-300/70 text-black text-sm transition-colors duration-300"
        >
          <User className="w-6 h-6 rounded-full" />
          <div className="flex flex-col items-start">
            <span className="text-sm m-0">Sign in / Register</span>
            <span className="font-semibold text-sm m-0">Orders & Account</span>
          </div>
        </button>
      </div>
    </>
  );
};

export default UserLogin;
