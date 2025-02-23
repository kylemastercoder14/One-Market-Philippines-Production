"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ReportFakeJobValidation } from "@/validators";

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
import { submitFakeJob } from "@/actions/report-suspicious";

const FakeJobForm = ({
  userId,
  onClose,
}: {
  userId: string | null;
  onClose: () => void;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof ReportFakeJobValidation>>({
    resolver: zodResolver(ReportFakeJobValidation),
    defaultValues: {
      howWereYouContacted: "",
	  others: "",
      suspiciousLink: "",
      lostOfAsset: "",
      description: "",
      screenShot: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof ReportFakeJobValidation>) {
    try {
      console.log(values);
      const res = await submitFakeJob({ ...values, others: values.others || "" }, userId || "");
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
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="X">X</SelectItem>
                    <SelectItem value="Tiktok">Tiktok</SelectItem>
                    <SelectItem value="Youtube">Youtube</SelectItem>
                    <SelectItem value="Pinterest">Pinterest</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch("howWereYouContacted") === "Others" && (
            <FormField
              control={form.control}
              name="others"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of the social media platform</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the name of the social media platform"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="suspiciousLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Suspicious website link or app name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the suspicious website link or app name"
                    {...field}
                  />
                </FormControl>
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

export default FakeJobForm;
