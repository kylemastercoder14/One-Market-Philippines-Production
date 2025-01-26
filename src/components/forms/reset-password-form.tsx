/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserResetPassword } from "@/validators";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import FormSuccess from "../globals/form-success";
import FormError from "../globals/form-error";

const ResetPasswordForm = ({ passwordToken }: { passwordToken: string }) => {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordRequirements, setPasswordRequirements] = useState({
    hasNumber: false,
    hasLetter: false,
    hasSpecialChar: false,
    isValidLength: false,
  });

  const checkPasswordRequirements = (password: string) => {
    setPasswordRequirements({
      hasNumber: /\d/.test(password),
      hasLetter: /[a-zA-Z]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      isValidLength: password.length >= 6 && password.length <= 20,
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const form = useForm<z.infer<typeof UserResetPassword>>({
    resolver: zodResolver(UserResetPassword),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof UserResetPassword>) => {
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const password = values.password;
      const confirmPassword = values.confirmPassword;
      await axios.post("/api/user/reset-password", {
        password,
        confirmPassword,
        passwordToken,
      });
      setSuccess("Password reset successfully.");
      window.location.assign("/")
    } catch (error: any) {
      console.error("Error during submission:", error);
      setError(
        error.response?.data || "An error occurred. Please try again later."
      );
    }
  };
  return (
    <>
      {success && <FormSuccess message={success} />}
      {error && <FormError message={error} />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
          className="mt-5 flex flex-col relative"
        >
          <div className="space-y-2">
            <div className="flex flex-col">
              <FormField
                control={form.control}
                name="password"
                disabled={isSubmitting}
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter a password"
                        {...field}
                        onChange={(e) => {
                          const pwd = e.target.value;
                          field.onChange(e);
                          setPassword(pwd);
                          checkPasswordRequirements(pwd);
                        }}
                      />
                    </FormControl>
                    <Button
                      onClick={handleShowPassword}
                      disabled={isSubmitting}
                      type="button"
                      className="absolute top-6 right-1 hover:bg-transparent text-muted-foreground"
                      size="icon"
                      variant="ghost"
                    >
                      {showPassword ? <Eye /> : <EyeClosed />}
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-xs text-muted-foreground mt-2">
                <p
                  className={`${
                    passwordRequirements.hasNumber &&
                    passwordRequirements.hasLetter &&
                    passwordRequirements.hasSpecialChar
                      ? "text-green-600"
                      : passwordRequirements.hasNumber ||
                          passwordRequirements.hasLetter ||
                          passwordRequirements.hasSpecialChar
                        ? "text-red-600"
                        : "text-muted-foreground"
                  }`}
                >
                  <span>
                    {passwordRequirements.hasNumber &&
                    passwordRequirements.hasLetter &&
                    passwordRequirements.hasSpecialChar
                      ? "✔"
                      : passwordRequirements.hasNumber ||
                          passwordRequirements.hasLetter ||
                          passwordRequirements.hasSpecialChar
                        ? "🗴"
                        : "•"}
                  </span>{" "}
                  Must contain numbers, letters, and special characters
                </p>
                <p
                  className={`${
                    passwordRequirements.isValidLength
                      ? "text-green-600"
                      : passwordRequirements.hasNumber ||
                          passwordRequirements.hasLetter ||
                          passwordRequirements.hasSpecialChar
                        ? "text-red-600"
                        : "text-muted-foreground"
                  }`}
                >
                  <span>
                    {passwordRequirements.isValidLength
                      ? "✔"
                      : passwordRequirements.hasNumber ||
                          passwordRequirements.hasLetter ||
                          passwordRequirements.hasSpecialChar
                        ? "🗴"
                        : "•"}
                  </span>{" "}
                  Must be 6-20 characters long
                </p>
              </div>
            </div>
            <FormField
              control={form.control}
              name="confirmPassword"
              disabled={isSubmitting}
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword1 ? "text" : "password"}
                      placeholder="Confirm the password"
                      {...field}
                    />
                  </FormControl>
                  <Button
                    onClick={handleShowPassword1}
                    disabled={isSubmitting}
                    type="button"
                    className="absolute top-6 right-1 hover:bg-transparent text-muted-foreground"
                    size="icon"
                    variant="ghost"
                  >
                    {showPassword1 ? <Eye /> : <EyeClosed />}
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isSubmitting} className="rounded-full w-full mt-5">
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ResetPasswordForm;
