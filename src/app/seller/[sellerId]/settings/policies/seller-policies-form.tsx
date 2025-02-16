"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { PoliciesSchema } from "@/validators/seller";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SellerWithProps } from "./client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Editor from "@/components/globals/editor";
import { Archive, PlusCircle } from "lucide-react";
import { createPolicies, updatePolicies, deletePolicy } from "@/actions/seller"; // Add deletePolicy

const SellerPoliciesForm = ({
  initialData,
}: {
  initialData: SellerWithProps | null;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof PoliciesSchema>>({
    resolver: zodResolver(PoliciesSchema),
    defaultValues: {
      policies:
        (initialData?.sellerPolicies?.length ?? 0) > 0
          ? initialData?.sellerPolicies.map((policy) => ({
              title: policy.title,
              content: policy.content,
            }))
          : [{ title: "", content: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "policies",
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof PoliciesSchema>) => {
    try {
      let res;
      if (initialData) {
        // Update existing policies
        res = await updatePolicies(values.policies, initialData.id);
      } else {
        // Create new policies
        res = await createPolicies(values.policies);
      }

      if (res.success) {
        toast.success(res.success);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error("Error submitting policies:", error);
      toast.error("Error submitting policies");
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      append({ title: "", content: "" });
    } else if (event.key === "Escape") {
      event.preventDefault();
      if (fields.length > 1) {
        remove(index);
      } else {
        toast.info("At least one policy is required.");
      }
    }
  };

  const handleDeletePolicy = async (index: number) => {
    try {
      if (initialData) {
        // If initialData exists, delete the policy from the database
        const policyId = initialData.sellerPolicies[index]?.id;
        if (policyId) {
          const res = await deletePolicy(policyId);
          if (res.success) {
            toast.success(res.success);
            router.refresh();
          } else {
            toast.error(res.error);
            return;
          }
        }
      }

      // Remove the field from the form
      remove(index);
    } catch (error) {
      console.error("Error deleting policy:", error);
      toast.error("Error deleting policy");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex w-full items-center gap-2">
              <div className="space-y-4 w-full">
                <FormField
                  control={form.control}
                  name={`policies.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder="e.g. 'Terms & Conditions'"
                          {...field}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                      </FormControl>
                      <FormDescription>
                        This is the title of your policy. It will be displayed
                        on your store.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`policies.${index}.content`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Editor
                          disabled={isSubmitting}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription>
                        This is the content of your policy. It will be displayed
                        on your store.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="mt-3"
                  variant="ghost"
                  type="button"
                  onClick={() => append({ title: "", content: "" })}
                >
                  <PlusCircle className="w-4 h-4" />
                  Add new policy
                </Button>
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => handleDeletePolicy(index)} // Updated onClick handler
                >
                  <Archive className="w-5 h-5" />
                  Delete policy
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button className="mt-5" disabled={isSubmitting} type="submit">
          Submit Policies
        </Button>
      </form>
    </Form>
  );
};

export default SellerPoliciesForm;
