"use client";

import { SellerCoupon } from "@prisma/client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import { CouponValidators } from "@/validators";

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
import { toast } from "sonner";
import { SmartDatetimeInput } from "@/components/ui/smart-datetime-input";
import { CircleHelp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import OptionCheck, { CheckGroup } from "@/components/globals/check-group";
import OptionRadio, { RadioGroup } from "@/components/globals/radio-group";
import AlertModal from "@/components/ui/alert-modal";
import { createCoupon, updateCoupon } from "@/actions/promotions";

const CouponForm = ({
  initialData,
  sellerId,
  sellerName,
}: {
  initialData: SellerCoupon | null;
  sellerId: string;
  sellerName: string | null;
}) => {
  const router = useRouter();
  const [alertOpen, setAlertOpen] = React.useState(false);

  const form = useForm<z.infer<typeof CouponValidators>>({
    resolver: zodResolver(CouponValidators),
    defaultValues: {
      name: initialData?.name || "",
      channel: initialData?.channel || [],
      startPeriod: initialData?.startDate || undefined,
      endPeriod: initialData?.endDate || undefined,
      type: initialData?.type || "",
      minimumSpend: initialData?.minimumSpend || 0,
      discountAmount: initialData?.discountAmount || 0,
      claimableQuantity: initialData?.claimableQuantity || 0,
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof CouponValidators>) {
    try {
      if (initialData) {
        const res = await updateCoupon(values, sellerId, initialData.id);
        if (res.success) {
          toast.success(res.success);
          router.push(`/seller/${sellerId}/promotions/coupons`);
        } else {
          toast.error(res.error);
        }
      } else {
        const res = await createCoupon(values, sellerId);
        if (res.success) {
          toast.success(res.success);
          router.push(`/seller/${sellerId}/promotions/coupons`);
        } else {
          toast.error(res.error);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create coupon");
    }
  }
  return (
    <>
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={() => router.push(`/seller/${sellerId}/promotions/coupons`)}
        title="Discard your changes?"
        description="
	  Are you sure you want to discard your changes? All unsaved changes will be lost.
	  "
      />
      <div className="mt-7">
        <Form {...form}>
          <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="bg-white dark:bg-zinc-900 shadow-md rounded-lg p-4 border">
              <h1 className="font-semibold text-lg mb-4">Basic information</h1>
              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="channel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Type of channel{" "}
                        <span className="text-red-600 mr-2 ml-1">*</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger type="button">
                              <CircleHelp className="w-4 h-4 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent className="w-60">
                              <p>
                                Select the channels where this coupon will be
                                shown. You can choose multiple channels to make
                                the coupon available in different areas of your
                                store.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormControl>
                        <CheckGroup
                          value={field.value}
                          onChangeAction={field.onChange}
                        >
                          <div className="flex gap-4 items-center mt-3">
                            <OptionCheck
                              disabled={isSubmitting}
                              value="Checkout"
                            >
                              <div>
                                <h3 className="font-semibold">Checkout</h3>
                                <p className="text-sm text-muted-foreground">
                                  Apply this coupon during the checkout process
                                  to provide discounts on the entire order.
                                </p>
                              </div>
                            </OptionCheck>
                            <OptionCheck
                              disabled={isSubmitting}
                              value="Single Product"
                            >
                              <div>
                                <h3 className="font-semibold">
                                  Single Product
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  Apply this coupon to a specific product,
                                  offering discounts on individual items.
                                </p>
                              </div>
                            </OptionCheck>
                            <OptionCheck
                              disabled={isSubmitting}
                              value="Shopping Cart"
                            >
                              <div>
                                <h3 className="font-semibold">Shopping Cart</h3>
                                <p className="text-sm text-muted-foreground">
                                  Apply this coupon to the shopping cart,
                                  providing discounts on the total cart value.
                                </p>
                              </div>
                            </OptionCheck>
                          </div>
                        </CheckGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>
                        Coupon name <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Coupon name is not visible to buyers (e.g. BUY1GET1)"
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
                              <TooltipTrigger type="button">
                                <CircleHelp className="w-4 h-4 cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent className="w-60">
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
                              <TooltipTrigger type="button">
                                <CircleHelp className="w-4 h-4 cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent className="w-60">
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
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-900 shadow-md rounded-lg p-4 border mt-5">
              <h1 className="font-semibold text-lg mb-4">Coupon settings</h1>
              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onChangeAction={field.onChange}
                        >
                          <div className="flex gap-4 items-center mt-3">
                            <OptionRadio
                              disabled={isSubmitting}
                              value="Money off"
                            >
                              <div>
                                <h3 className="font-semibold">Money off</h3>
                                <div className="border w-[400px] flex justify-between items-start px-3 py-3 rounded-md mt-2">
                                  <div>
                                    <p className="text-xs text-muted-foreground">
                                      From: {sellerName}
                                    </p>
                                    <p
                                      className={`text-xl ${form.watch("type") === "Money off" ? "text-[#8D021F] dark:text-[#fa5075]" : "text-zinc-500"} font-semibold mt-1`}
                                    >
                                      ₱{form.watch("discountAmount")} off
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                      Valid from{" "}
                                      {form
                                        .watch("startPeriod")
                                        ?.toLocaleDateString()}{" "}
                                      -{" "}
                                      {form
                                        .watch("endPeriod")
                                        ?.toLocaleDateString()}
                                    </p>
                                  </div>
                                  <Button
                                    size="sm"
                                    type="button"
                                    className={`${form.watch("type") === "Money off" ? "bg-[#8D021F] dark:bg-[#fa5075]" : "bg-zinc-400 hover:bg-zinc-400"}`}
                                  >
                                    Claim
                                  </Button>
                                </div>
                              </div>
                            </OptionRadio>
                            <OptionRadio
                              disabled={isSubmitting}
                              value="Money off (min.spend)"
                            >
                              <div>
                                <h3 className="font-semibold">
                                  Money off (min.spend)
                                </h3>
                                <div className="border w-[400px] flex justify-between items-start px-3 py-3 rounded-md mt-2">
                                  <div>
                                    <p className="text-xs text-muted-foreground">
                                      From: {sellerName}
                                    </p>
                                    <p
                                      className={`text-xl ${form.watch("type") === "Money off (min.spend)" ? "text-[#8D021F] dark:text-[#fa5075]" : "text-zinc-500"} font-semibold mt-1`}
                                    >
                                      ₱{form.watch("discountAmount")} off orders
                                      over ₱{form.watch("minimumSpend")}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                      Valid from{" "}
                                      {form
                                        .watch("startPeriod")
                                        ?.toLocaleDateString()}{" "}
                                      -{" "}
                                      {form
                                        .watch("endPeriod")
                                        ?.toLocaleDateString()}
                                    </p>
                                  </div>
                                  <Button
                                    size="sm"
                                    type="button"
                                    className={`${form.watch("type") === "Money off (min.spend)" ? "bg-[#8D021F] dark:bg-[#fa5075]" : "bg-zinc-400 hover:bg-zinc-400"}`}
                                  >
                                    Claim
                                  </Button>
                                </div>
                              </div>
                            </OptionRadio>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                  {form.watch("type") === "Money off (min.spend)" && (
                    <FormField
                      control={form.control}
                      name="minimumSpend"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormLabel>
                            Minimum spend required{" "}
                            <span className="text-red-600">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Please enter the minimum spend required"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="discountAmount"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>
                          Discount amount{" "}
                          <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Please enter the discount amount"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="claimableQuantity"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>
                        Claimable coupon quantity{" "}
                        <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Please enter the claimable coupon quantity"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
              <Button disabled={isSubmitting}>
                {initialData ? "Save Changes" : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CouponForm;
