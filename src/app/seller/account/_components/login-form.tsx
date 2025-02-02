"use client";

import React, { useState } from "react";
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
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "sonner";
import { loginSeller } from "@/actions/seller";
import { AdminPolicies } from "@prisma/client";
import { Modal } from "@/components/ui/modal";
import Preview from "@/components/globals/preview";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const LoginForm = ({ data }: { data: AdminPolicies[] }) => {
  const policiesData = data[0] || {};
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [IntellectualOpen, setIntellectualOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const res = await loginSeller(values.email, values.password);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Login successful. Redirecting to dashboard...");
        setTimeout(() => router.push(`/seller/${res.seller}/dashboard`), 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Modal
        className="max-w-7xl max-h-[80vh] overflow-y-auto"
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      >
        <div className="p-1">
          <Preview value={policiesData.privacy as string} />
        </div>
      </Modal>
      <Modal
        className="max-w-7xl max-h-[80vh] overflow-y-auto"
        isOpen={IntellectualOpen}
        onClose={() => setIntellectualOpen(false)}
      >
        <div className="p-1">
          <Preview value={policiesData.intellectualProperty as string} />
        </div>
      </Modal>
      <Modal
        className="max-w-7xl max-h-[80vh] overflow-y-auto"
        isOpen={termsOpen}
        onClose={() => setTermsOpen(false)}
      >
        <div className="p-1">
          <Preview value={policiesData.terms as string} />
        </div>
      </Modal>
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
          <Button
            disabled={loading}
            className="mt-5 w-full mb-4 bg-orange-600 hover:bg-orange-600/80"
            type="submit"
          >
            Login
          </Button>
          <span className="text-sm text-muted-foreground">
            By continuing, you agree to the{" "}
            <span
              onClick={() => setTermsOpen(true)}
              className="cursor-pointer font-semibold hover:text-orange-600 text-zinc-700"
            >
              Terms and Agreement for 1 Market Philippines
            </span>
            ,{" "}
            <span
              onClick={() => setIntellectualOpen(true)}
              className="cursor-pointer font-semibold hover:text-orange-600 text-zinc-700"
            >
              Our Intellectual Property Policy
            </span>{" "}
            and acknowledge that you have read the{" "}
            <span
              onClick={() => setPrivacyOpen(true)}
              className="cursor-pointer font-semibold hover:text-orange-600 text-zinc-700"
            >
              1 Market Philippines Shop Privacy Policy
            </span>{" "}
            to learn how we collect, use and share your data.
          </span>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
