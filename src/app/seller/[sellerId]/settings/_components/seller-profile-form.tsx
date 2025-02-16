/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProfileSchema } from "@/validators/seller";

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
import { SellerWithProps } from "./client";
import ComboBox from "@/components/ui/combo-box";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditIcon } from "lucide-react";
import SingleImageUpload from "@/components/globals/single-image-upload";
import AlertModal from "@/components/ui/alert-modal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteProfileImage, updateProfileInformation } from "@/actions/seller";

const SellerProfileForm = ({
  initialData,
}: {
  initialData: SellerWithProps | null;
}) => {
  const router = useRouter();
  const [nationalities, setNationalities] = useState<string[]>([]);
  const [alertModal, setAlertModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    console.log("Toggling isEditing:", !isEditing);
    setIsEditing((prev) => !prev);
  };
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      businessName: initialData?.name || "",
      givenName: initialData?.givenName || "",
      familyName: initialData?.familyName || "",
      email: initialData?.email || "",
      nationality: initialData?.sellerAddress[0].nationality || "",
      contactNumber: initialData?.sellerAddress[0].contactNumber || "",
      residentialAddress:
        initialData?.sellerAddress[0].residentialAddress || "",
      profileImage: isEditing ? "" : initialData?.image || "",
    },
  });

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

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof ProfileSchema>) => {
    try {
      const res = await updateProfileInformation(
        values,
        initialData?.id as string,
        initialData?.sellerAddress[0].id as string
      );
      if (res.success) {
        toast.success(res.success);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  const onDeleteProfile = async () => {
    try {
      const res = await deleteProfileImage(initialData?.id as string);
      if (res.success) {
        toast.success(res.success);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
      toast.error("Error deleting profile");
    }
  };
  return (
    <>
      <AlertModal
        isOpen={alertModal}
        onClose={() => setAlertModal(false)}
        onConfirm={onDeleteProfile}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {!isEditing || initialData?.image ? (
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={initialData?.image as string} />
                  <AvatarFallback>
                    {initialData?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2">
                  <Button
                    onClick={toggleEdit}
                    type="button"
                    size="icon"
                    variant="secondary"
                  >
                    <EditIcon className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div>
                <Button
                  onClick={() => setAlertModal(true)}
                  type="button"
                  size="sm"
                  variant="destructive"
                >
                  Remove Image
                </Button>
              </div>
            </div>
          ) : (
            isEditing && (
              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Image</FormLabel>
                    <FormControl>
                      <SingleImageUpload
                        disabled={isSubmitting}
                        defaultValue={field.value}
                        onSingleImageUpload={field.onChange}
                      />
                    </FormControl>
                    <Button
                      onClick={toggleEdit}
                      type="button"
                      size="sm"
                      variant="destructive"
                    >
                      Cancel
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          )}
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input disabled placeholder="Store Name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public store name. You can&apos;t change this,
                  because this name matched your business registration.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled placeholder="Email Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            <FormField
              control={form.control}
              name="givenName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Given Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Given Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="familyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Family Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Family Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  You can manage your nationality. This is how others will see
                  you on the site.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="residentialAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Residential Address</FormLabel>
                <FormControl>
                  <Textarea
                    disabled
                    placeholder="Residential Address"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can&apos;t change this, because this residential address
                  matched your business registration.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input disabled placeholder="Contact Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} type="submit">
            Update Profile
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SellerProfileForm;
