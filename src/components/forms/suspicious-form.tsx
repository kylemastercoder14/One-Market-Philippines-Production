"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ReportSuspiciousValidation } from "@/validators";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import SingleImageUpload from "@/components/globals/single-image-upload";
import { submitReportSuspicious } from "@/actions/report-suspicious";

const SuspiciousForm = ({ userId, onClose }: { userId: string | null; onClose: () => void; }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof ReportSuspiciousValidation>>({
    resolver: zodResolver(ReportSuspiciousValidation),
    defaultValues: {
      howWereYouContacted: "",
      suspiciousEmail: "",
      platformSuspicious: "",
      lostOfAsset: "",
      description: "",
      screenShot: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof ReportSuspiciousValidation>) {
    try {
      console.log(values);
      const res = await submitReportSuspicious(values, userId || "");
      if (res.success) {
        router.refresh();
		onClose();
        toast.success(res.success);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit report");
    }
  }
  return (
    <Form {...form}>
      <form autoComplete='off' className="mt-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="howWereYouContacted"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How were you contacted?</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select how were you contacted?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="SMS">SMS</SelectItem>
                    <SelectItem value="Phone">Phone</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="suspiciousEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Suspicious Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the suspicious email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="platformSuspicious"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  What platform did you receive the scam email on?
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select what platform did you receive the scam email on?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Gmail">Gmail</SelectItem>
                    <SelectItem value="Yahoo">Yahoo</SelectItem>
                    <SelectItem value="Outlook">Outlook</SelectItem>
                    <SelectItem value="Hotmail">Hotmail</SelectItem>
                    <SelectItem value="Live">Live</SelectItem>
                    <SelectItem value="MSN">MSN</SelectItem>
                    <SelectItem value="ICloud">ICloud</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lostOfAsset"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Has there been a loss of assets? If yes, please fill in the
                  specific amount
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g. '2,000 pesos'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="screenShot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload screenshot of suspicious email</FormLabel>
                <FormControl>
                  <SingleImageUpload
                    disabled={isSubmitting}
                    defaultValue={field.value}
                    onSingleImageUpload={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Summarize the suspicious activity in a few sentences
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share details like a website URL or link that was provided. Do not include any personal information."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-7" type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          Submit Report
        </Button>
      </form>
    </Form>
  );
};

export default SuspiciousForm;
