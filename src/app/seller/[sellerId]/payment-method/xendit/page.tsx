"use client";

import React from "react";
import HeadingAction from "@/components/ui/heading-action";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BankAccountValidators } from "@/validators";
import { toast } from "sonner";
import AlertModal from "@/components/ui/alert-modal";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

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
import OptionRadio, { RadioGroup } from "@/components/globals/radio-group";
import Image from "next/image";
import ComboBox from "@/components/ui/combo-box";
import { createPaymentMethod } from "@/actions/payment-method";

const AddBankAccount = () => {
  const router = useRouter();
  const params = useParams();
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [focusOrange, setFocusOrange] = React.useState(false);

  const form = useForm<z.infer<typeof BankAccountValidators>>({
    resolver: zodResolver(BankAccountValidators),
    defaultValues: {
      name: "",
      type: "Bank",
      cardNumber: "",
      validThru: "",
      cvc: "",
      firstName: "",
      lastName: "",
      emailAddress: "",
      mobileNumber: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof BankAccountValidators>) {
    try {
        const res = await createPaymentMethod(values, params.sellerId as string);
        if (res.success) {
          toast.success(res.success);
          router.push(`/seller/${params.sellerId}/payment-method`);
        } else {
          toast.error(res.error);
        }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create coupon");
    }
  }

  const BANKOPTION = [
    "Visa",
    "Mastercard",
    "JCB",
    "BDO",
    "BPI",
    "RCBC",
    "Union Bank",
    "China Bank",
  ];

  const EWALLETOPTION = ["Gcash", "Maya", "Grabpay", "ShopeePay"];

  const handleFocus = () => {
    setFocusOrange(true);
  };

  const handleBlur = () => {
    setFocusOrange(false);
  };

  return (
    <>
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={() =>
          router.push(`/seller/${params.sellerId}/payment-method`)
        }
        title="Discard your changes?"
        description="
	  Are you sure you want to discard your changes? All unsaved changes will be lost.
	  "
      />
      <HeadingAction
        className="w-80"
        title="Payment Method"
        link={`/seller/${params.sellerId}/payment-method`}
      />
      <p className="text-sm text-muted-foreground mt-2">
        Fill in the bank account/e-wallet details to receive payments from your
        customers.
      </p>
      <div className="mt-7">
        <Form {...form}>
          <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="bg-white shadow-md rounded-lg p-4 border">
              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Payment Type <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onChangeAction={field.onChange}
                        >
                          <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
                            <OptionRadio disabled={isSubmitting} value="Bank">
                              <div>
                                <h3 className="font-semibold">Bank</h3>
                                <p>
                                  Choose this option to receive payments
                                  directly from 1 Market Philippines straight
                                  into your bank account. This method ensures
                                  secure and seamless transactions, allowing you
                                  to access your funds conveniently through your
                                  preferred banking partner.
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Image
                                    src="https://www.svgrepo.com/show/508730/visa-classic.svg"
                                    alt="Visa"
                                    width={40}
                                    height={40}
                                  />
                                  <Image
                                    src="https://www.svgrepo.com/show/508703/mastercard.svg"
                                    alt="Mastercard"
                                    width={40}
                                    height={40}
                                  />
                                  <Image
                                    src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Bank_of_the_Philippine_Islands_logo.svg/1920px-Bank_of_the_Philippine_Islands_logo.svg.png"
                                    alt="BPI"
                                    width={40}
                                    height={40}
                                  />
                                  <Image
                                    src="https://www.svgrepo.com/show/508695/jcb.svg"
                                    alt="JCB"
                                    width={40}
                                    height={40}
                                  />
                                  <Image
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/BDO_Unibank_%28logo%29.svg/1920px-BDO_Unibank_%28logo%29.svg.png"
                                    alt="BDO"
                                    width={40}
                                    height={40}
                                  />
                                </div>
                              </div>
                            </OptionRadio>
                            <OptionRadio
                              disabled={isSubmitting}
                              value="EWallet"
                            >
                              <div>
                                <h3 className="font-semibold">E-wallet</h3>
                                <p>
                                  Opt for this method to receive payments
                                  directly from 1 Market Philippines into your
                                  e-wallet. This option offers fast and
                                  hassle-free access to your funds, perfect for
                                  those who prefer digital transactions.
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Image
                                    src="https://getcash.ph/wp-content/uploads/2021/01/Transparent-1280-x-720.png"
                                    alt="Gcash"
                                    width={50}
                                    height={50}
                                    className="object-cover"
                                  />
                                  <Image
                                    src="https://logodix.com/logo/2206804.jpg"
                                    alt="Maya"
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                  />
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
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>
                        Provider <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <ComboBox
                          //   className="w-[700px]"
                          disabled={isSubmitting}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Select the provider"
                          data={
                            form.watch("type") === "Bank"
                              ? BANKOPTION.map((bank) => ({
                                  label: bank,
                                  value: bank,
                                }))
                              : EWALLETOPTION.map((ewallet) => ({
                                  label: ewallet,
                                  value: ewallet,
                                }))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch("type") === "Bank" && (
                  <>
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormLabel>
                            Card Number <span className="text-red-600">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9\s]*"
                              autoComplete="cc-number"
                              disabled={isSubmitting}
                              {...field}
                              placeholder="4000 0000 0000 1091"
                              onChange={(e) => {
                                let value = e.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 16); // Allow only digits, limit to 16
                                value = value.replace(/(\d{4})/g, "$1 ").trim(); // Format as "XXXX XXXX XXXX XXXX"
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                      <FormField
                        control={form.control}
                        name="validThru"
                        render={({ field }) => (
                          <FormItem className="relative">
                            <FormLabel>
                              Valid Thru <span className="text-red-600">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                disabled={isSubmitting}
                                {...field}
                                maxLength={5}
                                placeholder="MM/YY"
                                onChange={(e) => {
                                  let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                                  if (value.length > 4)
                                    value = value.slice(0, 4);
                                  if (value.length > 2) {
                                    value = `${value.slice(0, 2)}/${value.slice(2)}`;
                                  }
                                  field.onChange(value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cvc"
                        render={({ field }) => (
                          <FormItem className="relative">
                            <FormLabel>
                              CVC <span className="text-red-600">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                disabled={isSubmitting}
                                {...field}
                                placeholder="123"
                                maxLength={3}
                                onChange={(e) => {
                                  const value = e.target.value.replace(
                                    /\D/g,
                                    ""
                                  ); // Remove non-numeric characters
                                  field.onChange(value.slice(0, 3)); // Restrict to 3 digits
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}
                <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>
                          First Name <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            disabled={isSubmitting}
                            {...field}
                            placeholder="Enter your first name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>
                          Last Name <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            disabled={isSubmitting}
                            {...field}
                            placeholder="Enter your last name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>
                        Email Address <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          disabled={isSubmitting}
                          {...field}
                          placeholder="Enter your email address"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>
                        {form.watch("type") === "Bank"
                          ? "Mobile Number"
                          : "Account Number"}{" "}
                        <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <PhoneInput
                          className={`flex h-9 ${focusOrange ? "border-black" : "border-input"} w-full rounded-full border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-[#8D021F] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
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
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex items-center justify-end mt-5">
              <Button
                type="button"
                onClick={() => setAlertOpen(true)}
                variant="ghost"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AddBankAccount;
