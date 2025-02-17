"use client";

import { SellerProduct, SubCategory } from "@prisma/client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import React, { useEffect } from "react";
import { NonFoodProductValidators } from "@/validators";
import { generateSKU } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import AlertModal from "@/components/ui/alert-modal";
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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { createNonFoodProductWithoutPrice, createNonFoodProductWithPrice, updateNonFoodProduct } from "@/actions/product";
import SuggestCategoryForm from '@/components/forms/suggest-category-form';

const NonFoodProductForm = ({
  subCategories,
  sellerId,
  initialData,
}: {
  subCategories: SubCategory[];
  sellerId: string;
  initialData: SellerProduct | null;
}) => {
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof NonFoodProductValidators>>({
    resolver: zodResolver(NonFoodProductValidators),
    defaultValues: {
      title: initialData?.name || "",
      description: initialData?.description || "",
      status: initialData?.status as "In stock" | "Out of stock" | undefined,
      media: initialData?.images || [],
      brand: initialData?.brand || "",
      materials: initialData?.materials || [],
      price: initialData?.price || 0,
      height: initialData?.height || 0,
      weight: initialData?.weight || 0,
      sku: initialData?.sku || "",
      isVariant: initialData?.isVariant || false,
      category: initialData?.category || "",
      tags: initialData?.tags || [],
      warrantyPeriod: initialData?.warrantyPeriod || "",
      warrantyPolicy: initialData?.warrantyPolicy || "",
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

  async function onSubmit(values: z.infer<typeof NonFoodProductValidators>) {
    setIsAlertOpen(false);
    try {
      if (initialData) {
        const res = await updateNonFoodProduct(
          values,
          initialData.id,
          sellerId
        );
        if (res.success) {
          toast.success(res.success);
          router.push(`/seller/${sellerId}/manage-products`);
        } else {
          toast.error(res.error);
        }
      } else {
        if (values.isVariant) {
          const res = await createNonFoodProductWithoutPrice(values, sellerId);
          if (res.success) {
            toast.success(res.success);
            router.push(`/seller/${sellerId}/manage-products`);
          } else {
            toast.error(res.error);
          }
        } else {
          const res = await createNonFoodProductWithPrice(values, sellerId);
          if (res.success) {
            toast.success(res.success);
            router.push(`/seller/${sellerId}/manage-products/create/${values.slug}`);
          } else {
            toast.error(res.error);
          }
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create product");
    } finally {
      setIsAlertOpen(false);
    }
  }

  return (
    <>
      <AlertModal
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={form.handleSubmit(onSubmit)}
        title="Are you sure you want to save it without adding any variants?"
        description="You have not added any variants for this product. If you save it now, you will not be able to add variants later."
      />

      <Form {...form}>
        <form>
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
                          placeholder="e.g 'Short sleeve t-shirt"
                          {...field}
                          maxLength={100}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        The product name cannot exceed 100 characters or contain
                        prohibited words.
                      </FormDescription>
                      <span className="absolute top-8 text-sm text-muted-foreground right-3">
                        {form.watch("title")?.length || 0}/100
                      </span>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch("isVariant") === false && (
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>
                          Price{" "}
                          <span className="text-muted-foreground">
                            (optional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g '249.99"
                            {...field}
                            type={"number"}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormDescription>
                          Leave it empty if you have variants for this product.
                          The price should be added to every variant.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
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
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Brand{" "}
                          <span className="text-muted-foreground">
                            (optional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            {...field}
                            placeholder="Enter the brand name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="materials"
                    disabled={isSubmitting}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Materials <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <TagsInput
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder="Enter the materials used"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid md:grid-cols-2 grid:cols-1 gap-3">
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>
                          Weight{" "}
                          <span className="text-muted-foreground">
                            (optional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            disabled={isSubmitting}
                            {...field}
                            placeholder="Enter the weight"
                          />
                        </FormControl>
                        <span className="absolute top-8 text-sm text-muted-foreground right-3">
                          kg
                        </span>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>
                          Height{" "}
                          <span className="text-muted-foreground">
                            (optional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            disabled={isSubmitting}
                            {...field}
                            placeholder="Enter the height"
                          />
                        </FormControl>
                        <span className="absolute top-8 text-sm text-muted-foreground right-3">
                          cm
                        </span>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid md:grid-cols-2 grid:cols-1 gap-3">
                  <FormField
                    control={form.control}
                    name="category"
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
                            placeholder="Select the product category"
                            data={subCategories.map((subCategory) => ({
                              label: subCategory.name,
                              value: subCategory.name,
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
                          className="absolute cursor-pointer top-8 text-sm text-orange-600 font-semibold right-3"
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
                        Product Images <span className="text-red-600">*</span>
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
                          placeholder="Enter the product tags"
                        />
                      </FormControl>
                      <FormDescription>
                        This will help customers find your product when they
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
                            <SelectItem value="In stock">In stock</SelectItem>
                            <SelectItem value="Out of stock">
                              Out of stock
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="bg-white dark:bg-zinc-900 border shadow rounded md p-3 mt-4 space-y-4">
                <FormField
                  control={form.control}
                  name="warrantyPeriod"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>
                        Warranty period{" "}
                        <span className="text-muted-foreground">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                          disabled={isSubmitting}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select the warranty period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1 week">1 week</SelectItem>
                            <SelectItem value="2 weeks">2 weeks</SelectItem>
                            <SelectItem value="3 weeks">3 weeks</SelectItem>
                            <SelectItem value="1 month">1 month</SelectItem>
                            <SelectItem value="3 months">3 months</SelectItem>
                            <SelectItem value="6 months">6 months</SelectItem>
                            <SelectItem value="9 months">9 months</SelectItem>
                            <SelectItem value="1 year">1 year</SelectItem>
                            <SelectItem value="2 years">2 years</SelectItem>
                            <SelectItem value="3 years">3 years</SelectItem>
                            <SelectItem value="5 years">5 years</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="warrantyPolicy"
                  disabled={isSubmitting}
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>
                        Warranty Policy{" "}
                        <span className="text-muted-foreground">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Editor
                          onChange={field.onChange}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="bg-white dark:bg-zinc-900 border shadow rounded md p-3 mt-4 space-y-4">
                <FormField
                  control={form.control}
                  name="isVariant"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Is there a variant for this product?
                        </FormLabel>
                        <FormDescription>
                          You can check this box if you have variants for this
                          product like size, color, etc.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-3 justify-end mt-5">
                {initialData ? (
                  <Button
                    disabled={isSubmitting || !isValid}
                    onClick={() => {
                      form.handleSubmit(onSubmit)();
                    }}
                    type="submit"
                  >
                    Save Changes
                  </Button>
                ) : (
                  <Button
                    disabled={isSubmitting || !isValid}
                    type="button"
                    onClick={() => {
                      if (form.watch("isVariant")) {
                        router.push(
                          `/seller/${sellerId}/manage-products/create/${form.watch("slug")}`
                        );
                        form.handleSubmit(onSubmit)();
                        toast.success("Product saved successfully");
                      } else {
                        setIsAlertOpen(true);
                      }
                    }}
                  >
                    Create Product
                  </Button>
                )}
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

export default NonFoodProductForm;
