"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import { ProductDiscountValidators } from "@/validators";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { toast } from "sonner";
import { SmartDatetimeInput } from "@/components/ui/smart-datetime-input";
import { CiCircleQuestion } from "react-icons/ci";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AlertModal from "../ui/alert-modal";
import { SellerDiscount } from "@prisma/client";

const ProductDiscountForm = ({
  sellerId,
  initialData,
}: {
  sellerId: string;
  initialData: SellerDiscount | null;
}) => {
  const router = useRouter();

  const [alertOpen, setAlertOpen] = React.useState(false);

  const form = useForm<z.infer<typeof ProductDiscountValidators>>({
    resolver: zodResolver(ProductDiscountValidators),
    defaultValues: {
      name: "",
      startPeriod: undefined,
      endPeriod: undefined,
      type: "Percentage Off",
      products: [],
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof ProductDiscountValidators>) {
    alert(JSON.stringify(values, null, 2));
    try {
      //   const res = await createNonFoodProduct(values, sellerId);
      //   if (res.success) {
      //     toast.success(res.success);
      //     router.push(`/seller/${sellerId}/manage-products`);
      //   } else {
      //     toast.error(res.error);
      //   }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create product discount");
    }
  }
  return (
    <>
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={() =>
          router.push(`/seller/${sellerId}/promotions/discounts`)
        }
        title="Discard your changes?"
        description="
	  Are you sure you want to discard your changes? All unsaved changes will be lost.
	  "
      />
      <div className="mt-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="bg-white shadow-md rounded-lg p-4 border">
              <h1 className="font-semibold text-lg mb-4">Basic information</h1>
              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>
                        Promotion name <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Promotion name is not visible to buyers"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                  <FormField
                    control={form.control}
                    name="startPeriod"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel className="flex items-center">
                          Start date{" "}
                          <span className="text-red-600 ml-1 mr-2">*</span>{" "}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <CiCircleQuestion className="w-4 h-4 cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  This is a smart input field, if you type
                                  &rsquo;tomorrow at 3pm&rsquo; it will
                                  automatically set the date and time for you.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <FormControl>
                          <SmartDatetimeInput
                            onValueChange={field.onChange}
                            name="datetime"
                            value={field.value}
                            placeholder="e.g. tomorrow at 3pm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endPeriod"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel className="flex items-center">
                          End date{" "}
                          <span className="text-red-600 ml-1 mr-2">*</span>{" "}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <CiCircleQuestion className="w-4 h-4 cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  This is a smart input field, if you type
                                  &rsquo;one week from now&rsquo; it will
                                  automatically set the date and time for you.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <FormControl>
                          <SmartDatetimeInput
                            onValueChange={field.onChange}
                            name="datetime"
                            value={field.value}
                            placeholder="e.g. one week from now"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="flex items-center">
                        Discount type{" "}
                        <span className="text-red-600 ml-1 mr-2">*</span>{" "}
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex items-center space-x-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Percentage Off" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Percentage off
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Fixed Price" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Fixed price
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>
                        The price is reduced by a set percentage or a fixed
                        amount.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 border mt-7">
              <h1 className="font-semibold text-lg">Products</h1>
              <p className="text-muted-foreground">
                Select products and set promotional prices
              </p>
              <Button
                disabled={isSubmitting}
                type="button"
                variant="outline"
                className="mt-3 border-orange-600 text-orange-600 hover:text-orange-600/80 hover:bg-orange-100/60"
              >
                Select Products
              </Button>
            </div>
            <div className="flex items-center justify-end mt-5 gap-2">
              <Button
                disabled={isSubmitting}
                type="button"
                onClick={() => setAlertOpen(true)}
                variant="ghost"
              >
                Cancel
              </Button>
              <Button disabled={isSubmitting || !isValid}>
                {initialData ? "Save Changes" : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ProductDiscountForm;
