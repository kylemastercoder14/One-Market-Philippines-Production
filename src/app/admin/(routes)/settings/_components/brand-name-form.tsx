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
import { createPlatformName, updatePlatformName } from "@/actions/admin";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  brandName: z.string().min(1, { message: "Platform name is required" }),
});

const BrandNameForm = ({
  brandName,
  settingsId,
}: {
  brandName: string | null;
  settingsId: string;
}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);
  const toggleEdit = () => setIsEditing((prev) => !prev);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandName: brandName || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!settingsId) {
        await createPlatformName(values.brandName);
      } else {
        await updatePlatformName(values.brandName, settingsId);
      }
      toast.success("Platform name updated successfully");
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
          <Label className="font-semibold">Platform Name</Label>
          <Button size="sm" onClick={toggleEdit} variant="outline">
            {isEditing && <>Cancel</>}
            {!isEditing && (
              <>
                <PencilIcon className="w-4 h-4" />
                Edit platform name
              </>
            )}
          </Button>
        </div>
        {!isEditing && (
          <div
            className={cn(
              "text-sm",
              !brandName && "text-muted-foreground italic"
            )}
          >
            {!brandName && "No platform name provided"}
            {brandName}
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
                name="brandName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        className="bg-white"
                        placeholder="e.g. 'One Market Philippines'"
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

export default BrandNameForm;
