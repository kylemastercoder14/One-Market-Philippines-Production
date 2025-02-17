/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { finishSettingUpSeller } from "@/actions/seller";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ComboBox from "@/components/ui/combo-box";

const formSchema = z.object({
  nationality: z.string().min(1, { message: "Nationality is required" }),
  businessAddress: z
    .string()
    .min(1, { message: "Business address is required" }),
  streetAddress: z.string().optional(),
  contactPerson: z.string().min(1, { message: "Contact person is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  isReturnRefundAddress: z.boolean().optional(),
});

const SettingUpForm = ({ sellerId }: { sellerId: string }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nationality: "",
      businessAddress: "",
      streetAddress: "",
      contactPerson: "",
      phoneNumber: "",
      isReturnRefundAddress: true,
    },
  });
  const [nationalities, setNationalities] = useState<string[]>([]);
  const [focusOrange, setFocusOrange] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the nationalities from the REST Countries API
    const fetchNationalities = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        // Extract unique nationalities (demonym), remove duplicates, and sort alphabetically
        const demonyms = data
          .map(
            (country: any) =>
              country.demonyms?.eng?.m || country.demonyms?.eng?.f
          )
          .filter(Boolean); // Remove null/undefined values
        const uniqueSortedNationalities = Array.from(new Set(demonyms)).sort(); // Remove duplicates and sort
        setNationalities(uniqueSortedNationalities as string[]);
      } catch (error) {
        console.error("Error fetching nationalities:", error);
      }
    };

    fetchNationalities();
  }, []);

  const handleFocus = () => {
    setFocusOrange(true);
  };

  const handleBlur = () => {
    setFocusOrange(false);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const res = await finishSettingUpSeller(
        values.nationality,
        values.businessAddress,
        values.streetAddress || "",
        values.contactPerson,
        values.phoneNumber,
        values.isReturnRefundAddress || false,
        sellerId
      );
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.success);
        router.push(`/seller/${sellerId}/home`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 space-y-6"
      >
        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nationality</FormLabel>
              <FormControl>
                <ComboBox
                  className="w-[688px]"
                  data={nationalities.map((national) => ({
                    label: national,
                    value: national,
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select your nationality"
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Address</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter the business address"
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="streetAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter the street address"
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
          <FormField
            control={form.control}
            name="contactPerson"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Person</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter the contact person"
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Person</FormLabel>
                <FormControl>
                  <PhoneInput
                    className={`flex h-9 ${focusOrange ? "dark:border-[#ff3661] border-[#8D021F]" : "border-input"} w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-1 dark:focus-visible:ring-[#ff3661] focus-visible:ring-[#8D021F] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                    placeholder="Enter the phone number"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    defaultCountry="PH"
                    countries={["PH"]}
                    international
                    countryCallingCodeEditable={false}
                    withCountryCallingCode
                    limitMaxLength={true}
                    value={field.value}
                    onChange={field.onChange}
                    numberInputProps={{
                      className: `rounded-md px-4 focus:outline-none bg-transparent h-full w-full !bg-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed`,
                    }}
                    maxLength={16}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="isReturnRefundAddress"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Set as return/refund address</FormLabel>
                <FormDescription>
                  This will be used as the return/refund address for your store.
                  You can change this later in your settings.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button
          disabled={loading}
          className="flex ml-auto"
        >
          Start to add products
        </Button>
      </form>
    </Form>
  );
};

export default SettingUpForm;
