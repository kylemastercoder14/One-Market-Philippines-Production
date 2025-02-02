"use client";

import { Category, SubCategory, Seller } from "@prisma/client";
import React, { useEffect } from "react";
import Heading from "@/components/ui/heading";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";
import { TagsInput } from "@/components/ui/tags-input";
import { toast } from "sonner";
import { createCategory, updateCategory } from "@/actions/categories";

interface CategoryFormProps extends Category {
  sellerSubCategory: SubCategory[];
  seller: Seller[];
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Category is required" })
    .max(50, { message: "Category should not exceed 50 characters" }),
  slug: z.string().optional(),
  subCategories: z
    .array(z.string().min(1, { message: "Subcategory name is required" }))
    .nonempty({ message: "At least one subcategory is required" }),
});

const CategoryForm = ({
  initialData,
}: {
  initialData: CategoryFormProps | null;
}) => {
  const router = useRouter();
  const title = initialData ? "Edit Category" : "Add New Category";
  const description = initialData
    ? "Please fill all required fields to edit the category details"
    : "Please fill all required fields to add a new category";
  const action = initialData ? "Save Changes" : "Create Category";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      subCategories:
        initialData?.sellerSubCategory.map((subCategory) => subCategory.name) ||
        [],
    },
  });

  const { isSubmitting } = form.formState;

  // Watch the `name` field for changes
  const nameValue = useWatch({
    control: form.control,
    name: "name",
  });

  // Update the slug whenever the name changes
  useEffect(() => {
    const slug = nameValue
      ? nameValue.trim().toLowerCase().replace(/\s+/g, "-")
      : "";
    form.setValue("slug", slug, { shouldValidate: true });
  }, [nameValue, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (initialData) {
        const res = await updateCategory({
          id: initialData.id,
          name: values.name,
          slug: values.slug || "",
          subCategories: values.subCategories.filter(Boolean), // Remove empty values
        });

        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success(res.success);
          router.push("/admin/manage-categories");
        }
      } else {
        const res = await createCategory({
          ...values,
          slug: values.slug || "",
          subCategories: values.subCategories.filter(Boolean), // Remove empty values
        });

        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success(res.success);
          router.push("/admin/manage-categories");
        }
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      <Heading title={title} description={description} />
      <Form {...form}>
        <form
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-5"
        >
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Category Name <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g 'Food and Beverages'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be displayed on the seller&apos;s account if they
                    want to create a store.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <span>Slug</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger
                          type="button"
                          className="font-semibold text-sm"
                        >
                          <CircleHelp className="w-4 h-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            This will be the unique identifier of a category
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      placeholder="e.g 'food-and-beverages'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subCategories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Sub-category Name <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <TagsInput
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="e.g 'Cafe', 'Restaurant', 'Bar'"
                    />
                  </FormControl>
                  <FormDescription>
                    This will be displayed on the seller&apos;s account if they
                    want to create a product or services under this category.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="mt-3" disabled={isSubmitting} type="submit">
            {action}
          </Button>
          <Button
            variant="ghost"
            className="mt-3 mx-2"
            disabled={isSubmitting}
            onClick={() => router.back()}
            type="button"
          >
            Cancel
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
