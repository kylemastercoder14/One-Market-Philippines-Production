"use client";

import { Seller, SellerProduct, SubCategory } from "@prisma/client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import React, { useEffect } from "react";
import { ServiceValidators } from "@/validators";
import { generateSKU } from "@/lib/utils";

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
import Editor from "@/components/globals/editor";
import MultipleImageUpload from "@/components/globals/multiple-image-upload";
import { TagsInput } from "@/components/ui/tags-input";
import ComboBox from "@/components/ui/combo-box";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { createService, updateService } from "@/actions/product";
import SuggestCategoryForm from "@/components/forms/suggest-category-form";

const ServiceProductForm = ({
  subCategories,
  seller,
  initialData,
}: {
  subCategories: SubCategory[];
  seller: Seller | null;
  initialData: SellerProduct | null;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof ServiceValidators>>({
    resolver: zodResolver(ServiceValidators),
    defaultValues: {
      title: initialData?.name || "",
      description: initialData?.description || "",
      status: initialData?.status as "In stock" | "Out of stock" | undefined,
      media: initialData?.images || [],
      price: initialData?.price || 0,
      sku: initialData?.sku || "",
      isVariant: initialData?.isVariant || false,
      subCategorySlug: initialData?.subCategoryId || "",
      tags: initialData?.tags || [],
      slug: initialData?.slug || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const handleGenerateSKU = () => {
    const newSKU = generateSKU();
    form.setValue("sku", newSKU);
  };

  // Watch the `name` field for changes
  const nameValue = useWatch({
    control: form.control,
    name: "title",
  });

  useEffect(() => {
    const slug = nameValue
      ? nameValue.trim().toLowerCase().replace(/\s+/g, "-")
      : "";
    form.setValue("slug", slug, { shouldValidate: true });
  }, [nameValue, form]);

  async function onSubmit(values: z.infer<typeof ServiceValidators>) {
    try {
      if (initialData) {
        const res = await updateService(
          values,
          initialData.id,
          seller?.id as string
        );
        if (res.success) {
          toast.success(res.success);
          router.push(`/seller/${seller?.id}/manage-products`);
        } else {
          toast.error(res.error);
        }
      } else {
        const res = await createService(
          values,
          seller?.id as string,
          seller?.categorySlug as string
        );
        if (res.success) {
          toast.success(res.success);
          router.push(`/seller/${seller?.id}/manage-products`);
        } else {
          toast.error(res.error);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create product");
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-5 grid md:grid-cols-10 grid-cols-1 gap-5">
            <div className="md:col-span-7">
              <div className="bg-white dark:bg-zinc-900 border shadow rounded md p-3 mt-4 space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>
                        Title <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g 'Haircut Service'"
                          {...field}
                          maxLength={100}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        The service name cannot exceed 100 characters or contain
                        prohibited words.
                      </FormDescription>
                      <span className="absolute top-8 text-sm text-muted-foreground right-3">
                        {form.watch("title")?.length || 0}/100
                      </span>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>
                        Price <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g '249.99"
                          {...field}
                          type={"number"}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  disabled={isSubmitting}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Description <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Editor {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="bg-white dark:bg-zinc-900 border shadow rounded md p-3 mt-4 space-y-4">
                <div className="grid md:grid-cols-2 grid:cols-1 gap-3">
                  <FormField
                    control={form.control}
                    name="subCategorySlug"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>
                          Category <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <ComboBox
                            emptyChildren={
                              <>
                                <span className="text-lg font-semibold">
                                  No search results found
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  Suggest a category to help us optimize our
                                  category library
                                </span>
                                <SuggestCategoryForm />
                              </>
                            }
                            className="w-[700px]"
                            disabled={isSubmitting}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Select the service category"
                            data={subCategories.map((subCategory) => ({
                              label: subCategory.name,
                              value: subCategory.slug,
                            }))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>
                          SKU <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            {...field}
                            placeholder="Enter the sku"
                          />
                        </FormControl>
                        <span
                          onClick={handleGenerateSKU}
                          className="absolute cursor-pointer top-8 text-sm dark:text-[#ff3661] text-[#8D021F] font-semibold right-3"
                        >
                          Generate
                        </span>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 border shadow rounded md p-3 mt-4 space-y-4">
                <FormField
                  control={form.control}
                  name="media"
                  disabled={isSubmitting}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Service Images <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <MultipleImageUpload
                          maxImages={4}
                          onImageUpload={(urls) => field.onChange(urls)}
                          disabled={isSubmitting}
                          defaultValues={field.value?.map((file) =>
                            typeof file === "string"
                              ? file
                              : URL.createObjectURL(file)
                          )}
                        />
                      </FormControl>
                      <FormDescription>
                        Upload 1 to 4 images in .png, .jpg, .jpeg, .webp format
                        with a resolution of at least 100*100 px. The file must
                        not be bigger than 5 MB and the aspect ratio should be
                        1:1.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="bg-white dark:bg-zinc-900 border shadow rounded md p-3 mt-4 space-y-4">
                <FormField
                  control={form.control}
                  name="tags"
                  disabled={isSubmitting}
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>
                        Tags <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <TagsInput
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Enter the service tags"
                        />
                      </FormControl>
                      <FormDescription>
                        This will help customers find your service when they
                        search for it.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>
                        Status <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                          disabled={isSubmitting}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select the status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="In stock">
                              In stock (Available)
                            </SelectItem>
                            <SelectItem value="Out of stock">
                              Out of stock (Not available)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-3 justify-end mt-5">
                <Button disabled={isSubmitting || !isValid} type="submit">
                  {initialData ? "Save Changes" : "Create Service"}
                </Button>
                <Button
                  disabled={isSubmitting}
                  onClick={() => router.back()}
                  type="button"
                  variant="ghost"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ServiceProductForm;
