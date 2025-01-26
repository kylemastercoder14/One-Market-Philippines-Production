/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserForgotPassword } from "@/validators";
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
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import FormSuccess from "../globals/form-success";
import FormError from "../globals/form-error";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const form = useForm<z.infer<typeof UserForgotPassword>>({
    resolver: zodResolver(UserForgotPassword),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof UserForgotPassword>) => {
    try {
      const email = values.email.trim().toLowerCase();
      const existingUser = await axios.post("/api/user", { email });

      if (!existingUser.data) {
        // Email does not exist
		setError("Email does not exist");
      }

      await axios.post("/api/user/forgot-password", values);
      router.refresh();
      setSuccess("Password reset email sent. Please check your inbox.");
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
          </div>
          <Button disabled={isSubmitting} className="rounded-full w-full mt-5">
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Send Reset Email
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ForgotPasswordForm;
