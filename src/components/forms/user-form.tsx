/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRegistration } from "@/validators";
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
import { OtpStyledInput } from "@/components/ui/otp-input";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import FormSuccess from "../globals/form-success";
import FormError from "../globals/form-error";
import { toast } from 'sonner';

const UserForm = () => {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPasswordShownRegister, setIsPasswordShownRegister] = useState(false);
  const [isPasswordShownLogin, setIsPasswordShownLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  const form = useForm<z.infer<typeof UserRegistration>>({
    resolver: zodResolver(UserRegistration),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (values: z.infer<typeof UserRegistration>) => {
    try {
      const email = values.email.trim().toLowerCase();
      const existingUser = await axios.post("/api/user", { email });

      if (!existingUser.data) {
        // New user registration flow
        setIsPasswordShownRegister(true);
        setIsPasswordShownLogin(false);

        if (!values.password) {
          return;
        }

        await axios.post("/api/user/register", values);
        setSuccess(
          "Account created successfully. Please verify your email now."
        );
        return;
      }

      // Existing user login flow
      setIsPasswordShownRegister(false);
      setIsPasswordShownLogin(true);

      if (!values.password) {
        return;
      }

      const response = await axios.post("/api/user/login", values);
      if (response.status === 203) {
        setShowTwoFactor(true);
      } else if (response.status === 200) {
        window.location.assign("/");
        toast.success("Login successful");
      }
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
          {showTwoFactor && (
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <OtpStyledInput
                        numInputs={6}
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {!showTwoFactor && (
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter your email address"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isPasswordShownRegister && (
                <div className="flex flex-col">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Please enter your password"
                            {...field}
                            disabled={isSubmitting}
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
                        password.length === 0
                          ? "text-gray-500"
                          : passwordRequirements.hasNumber &&
                              passwordRequirements.hasLetter &&
                              passwordRequirements.hasSpecialChar
                            ? "text-green-600"
                            : "text-red-600"
                      }`}
                    >
                      {password.length === 0
                        ? "•"
                        : passwordRequirements.hasNumber &&
                            passwordRequirements.hasLetter &&
                            passwordRequirements.hasSpecialChar
                          ? "✔"
                          : "🗴"}{" "}
                      Must contain numbers, letters, and special characters
                    </p>
                    <p
                      className={`${
                        password.length === 0
                          ? "text-gray-500"
                          : passwordRequirements.isValidLength
                            ? "text-green-600"
                            : "text-red-600"
                      }`}
                    >
                      {password.length === 0
                        ? "•"
                        : passwordRequirements.isValidLength
                          ? "✔"
                          : "🗴"}{" "}
                      Must be 6-20 characters long
                    </p>
                  </div>
                </div>
              )}
              {isPasswordShownLogin && (
                <div className="flex flex-col">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Please enter your password"
                            {...field}
                            disabled={isSubmitting}
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
                </div>
              )}
            </div>
          )}
          <Button disabled={isSubmitting} className="rounded-full w-full mt-5">
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            {showTwoFactor ? "Confirm" : "Continue"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UserForm;
