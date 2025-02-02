"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
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
import { createAddress, updateAddress } from "@/actions/admin";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  address: z.string().min(1, { message: "Address is required" }),
});

const AddressForm = ({
  address,
  settingsId,
}: {
  address: string | null;
  settingsId: string;
}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);
  const toggleEdit = () => setIsEditing((prev) => !prev);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: address || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!settingsId) {
        await createAddress(values.address);
      } else {
        await updateAddress(values.address, settingsId);
      }
      toast.success("Address updated successfully");
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
          <Label className="font-semibold">Address</Label>
          <Button size="sm" onClick={toggleEdit} variant="outline">
            {isEditing && <>Cancel</>}
            {!isEditing && (
              <>
                <PencilIcon className="w-4 h-4" />
                Edit address
              </>
            )}
          </Button>
        </div>
        {!isEditing && (
          <div
            className={cn(
              "text-sm",
              !address && "text-muted-foreground italic"
            )}
          >
            {!address && "No address provided"}
            {address}
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
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        className="bg-white"
                        placeholder="e.g. 'Villamor Airbase, Pasay City, Metro Manila'"
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

export default AddressForm;
