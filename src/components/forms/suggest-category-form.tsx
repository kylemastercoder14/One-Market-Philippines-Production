"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
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
import Heading from "@/components/ui/heading";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SuggestCategoryValidators } from "@/validators";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { createSuggestedCategory } from "@/actions/categories";

const SuggestCategoryForm = () => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof SuggestCategoryValidators>>({
    resolver: zodResolver(SuggestCategoryValidators),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof SuggestCategoryValidators>) {
    try {
      const res = await createSuggestedCategory(
        values,
        params.sellerId as string
      );
      if (res.success) {
        toast.success(res.success);
        router.refresh();
		setOpen(false);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    }
  }
  return (
    <>
      <Modal className="max-w-2xl" isOpen={open} onClose={() => setOpen(false)}>
        <Heading
          title="Suggest Category"
          description="Suggest a new category for the website. This will be reviewed by the admin before being added to the website."
        />
        <Form {...form}>
          <form className="mt-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      maxLength={100}
                      placeholder="Enter the suggested category name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The category name cannot exceed 100 characters or contain
                    prohibited words.
                  </FormDescription>
                  <span className="absolute top-8 text-sm text-muted-foreground right-3">
                    {form.watch("title")?.length || 0}/100
                  </span>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isSubmitting || !isValid}
              type="submit"
              className="mt-4"
            >
              Submit
            </Button>
          </form>
        </Form>
      </Modal>
      <Button
        onClick={() => setOpen(true)}
        type="button"
        variant="ghost"
        className="text-orange-600 hover:bg-transparent hover:text-orange-600/80 font-semibold mt-2"
      >
        Suggest category
      </Button>
    </>
  );
};

export default SuggestCategoryForm;
