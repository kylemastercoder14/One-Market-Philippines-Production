"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ReportFakeWebsiteValidation } from "@/validators";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import SingleImageUpload from "@/components/globals/single-image-upload";
import { submitFakeWebsite } from "@/actions/report-suspicious";

const FakeWebsiteForm = ({
  userId,
  onClose,
}: {
  userId: string | null;
  onClose: () => void;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof ReportFakeWebsiteValidation>>({
    resolver: zodResolver(ReportFakeWebsiteValidation),
    defaultValues: {
      suspiciousLink: "",
      submitPersonalInfo: [],
      lostOfAsset: "",
      description: "",
      screenShot: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof ReportFakeWebsiteValidation>) {
    try {
      const res = await submitFakeWebsite(values, userId || "");
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

  const items = [
    {
      id: "I mentioned my account information.",
      label: "I mentioned my account information.",
    },
    {
      id: "I submitted my bank information.",
      label: "I submitted my bank information.",
    },
    {
      id: "I submitted my personal email, phone number, or home address.",
      label: "I submitted my personal email, phone number, or home address.",
    },
    {
      id: "I did not submit any information.",
      label: "I did not submit any information.",
    }
  ];
  return (
    <Form {...form}>
      <form autoComplete='off' className="mt-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
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
            name="submitPersonalInfo"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">
                    Did you submit any personal information? (multiple)
                  </FormLabel>
                </div>
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="submitPersonalInfo"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
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

export default FakeWebsiteForm;
