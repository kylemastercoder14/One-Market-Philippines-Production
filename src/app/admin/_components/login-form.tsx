/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AdminLogin } from '@/validators';
import axios from 'axios';

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<z.infer<typeof AdminLogin>>({
    resolver: zodResolver(AdminLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AdminLogin>) {
    setLoading(true);
    try {
      const res = await axios.post("/api/admin/login", values);
      if (res.status !== 200) {
        toast.error(res.statusText);
      } else {
        toast.success(res.statusText);
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 mt-5">
          <FormField
            control={form.control}
            name="email"
            disabled={loading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="password"
              disabled={loading}
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter a password"
                      {...field}
                    />
                  </FormControl>
                  <Button
                    onClick={handleShowPassword}
                    disabled={loading}
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
        </div>
        <Button disabled={loading} className="mt-5 w-full mb-4" type="submit">
          {loading && <Loader2 className='w-4 h-4 mr-2 animate-spin' />}
		  Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
