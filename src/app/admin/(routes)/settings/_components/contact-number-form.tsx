"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { createContactNumber, updateContactNumber } from "@/actions/admin";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  contactNumber: z.string().min(1, { message: "Contact number is required" }),
});

const ContactNumberForm = ({
  contactNumber,
  settingsId,
}: {
  contactNumber: string | null;
  settingsId: string;
}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);
  const toggleEdit = () => setIsEditing((prev) => !prev);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactNumber: contactNumber || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!settingsId) {
        await createContactNumber(values.contactNumber);
      } else {
        await updateContactNumber(values.contactNumber, settingsId);
      }
      toast.success("Contact number updated successfully");
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Card className="mt-5">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <Label className="font-semibold">Contact Number</Label>
          <Button size="sm" onClick={toggleEdit} variant="outline">
            {isEditing && <>Cancel</>}
            {!isEditing && (
              <>
                <PencilIcon className="w-4 h-4" />
                Edit contact number
              </>
            )}
          </Button>
        </div>
        {!isEditing && (
          <div
            className={cn(
              "text-sm",
              !contactNumber && "text-muted-foreground italic"
            )}
          >
            {!contactNumber && "No contact number provided"}
            {contactNumber}
          </div>
        )}
        {isEditing && (
          <Form {...form}>
            <form
              className="space-y-4 mt-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PhoneInput
                        className={`flex h-9 ${
                          !isSubmitting && "focus:ring-1 focus:ring-orange-600"
                        } w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-orange-600 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                        placeholder="Enter the phone number"
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
              <div className="flex items-center gap-x-2">
                <Button
                  size="sm"
                  disabled={!isValid || isSubmitting}
                  type="submit"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactNumberForm;
