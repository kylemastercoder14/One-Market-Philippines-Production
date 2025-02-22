"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FeedbackValidators } from "@/validators";

import OptionRadio, {
  RadioGroup as CustomRadioGroup,
} from "@/components/globals/radio-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { submitFeedback } from '@/actions/feedback';

const FeedbackForm = ({userId}: {userId: string | null}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FeedbackValidators>>({
    resolver: zodResolver(FeedbackValidators),
    defaultValues: {
      rate: "",
      comment: "",
      others: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof FeedbackValidators>) {
    try {
      const res = await submitFeedback({ ...values, others: values.others || "" }, userId || "");
	  if(res.success) {
		router.refresh();
		toast.success(res.success);
	  }else {
		toast.error(res.error);
	  }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create coupon");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem className="space-y-5 text-center">
                <FormLabel>
                  How do you feel about your visit on our site today?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    disabled={isSubmitting}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-10 items-center justify-center"
                  >
                    <FormItem className="flex flex-col items-center space-y-3 justify-center">
                      <FormControl>
                        <RadioGroupItem value="Excellent" />
                      </FormControl>
                      <FormLabel className="font-normal text-xs">
                        Excellent
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex flex-col items-center space-y-3 justify-center">
                      <FormControl>
                        <RadioGroupItem value="Good" />
                      </FormControl>
                      <FormLabel className="font-normal text-xs">
                        Good
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex flex-col items-center space-y-3 justify-center">
                      <FormControl>
                        <RadioGroupItem value="Fair" />
                      </FormControl>
                      <FormLabel className="font-normal text-xs">
                        Fair
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex flex-col items-center space-y-3 justify-center">
                      <FormControl>
                        <RadioGroupItem value="Poor" />
                      </FormControl>
                      <FormLabel className="font-normal text-xs">
                        Poor
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex flex-col items-center space-y-3 justify-center">
                      <FormControl>
                        <RadioGroupItem value="Very poor" />
                      </FormControl>
                      <FormLabel className="font-normal text-xs">
                        Very poor
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {(form.watch("rate") === "Fair" ||
            form.watch("rate") === "Poor" ||
            form.watch("rate") === "Very poor") && (
            <div className="bg-accent rounded-md p-5">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomRadioGroup
                        value={field.value}
                        onChangeAction={field.onChange}
                      >
                        <div className="flex flex-wrap items-center gap-3">
                          <OptionRadio
                            disabled={isSubmitting}
                            value="Website experience"
                            className="p-2"
                            radioShow={false}
                          >
                            <div className="text-sm">Website experience</div>
                          </OptionRadio>
                          <OptionRadio
                            disabled={isSubmitting}
                            value="Promotions"
                            className="p-2"
                            radioShow={false}
                          >
                            <div className="text-sm">Promotions</div>
                          </OptionRadio>
                          <OptionRadio
                            disabled={isSubmitting}
                            value="Site search"
                            className="p-2"
                            radioShow={false}
                          >
                            <div className="text-sm">Site search</div>
                          </OptionRadio>
                          <OptionRadio
                            disabled={isSubmitting}
                            value="Shopping cart"
                            className="p-2"
                            radioShow={false}
                          >
                            <div className="text-sm">Shopping cart</div>
                          </OptionRadio>
                          <OptionRadio
                            disabled={isSubmitting}
                            value="Checkout"
                            className="p-2"
                            radioShow={false}
                          >
                            <div className="text-sm">Checkout</div>
                          </OptionRadio>
                          <OptionRadio
                            disabled={isSubmitting}
                            value="Delivery"
                            className="p-2"
                            radioShow={false}
                          >
                            <div className="text-sm">Delivery</div>
                          </OptionRadio>
                          <OptionRadio
                            disabled={isSubmitting}
                            value="Returns"
                            className="p-2"
                            radioShow={false}
                          >
                            <div className="text-sm">Returns</div>
                          </OptionRadio>
                          <OptionRadio
                            disabled={isSubmitting}
                            value="Customer service"
                            className="p-2"
                            radioShow={false}
                          >
                            <div className="text-sm">Customer service</div>
                          </OptionRadio>
                          <OptionRadio
                            disabled={isSubmitting}
                            value="Others"
                            className="p-2"
                            radioShow={false}
                          >
                            <div className="text-sm">Others</div>
                          </OptionRadio>
                        </div>
                      </CustomRadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {(form.watch("rate") === "Good" ||
            form.watch("rate") === "Excellent") && (
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Textarea
                      placeholder="Please tell us more..."
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {form.watch("comment") === "Others" && (
            <FormField
              control={form.control}
              name="others"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Can you describe the problem?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide more information..."
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <Button className="w-full mt-7" type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          Submit Feedback
        </Button>
      </form>
    </Form>
  );
};

export default FeedbackForm;
