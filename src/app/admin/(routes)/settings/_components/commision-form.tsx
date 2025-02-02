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
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { createCommision, updateCommision } from "@/actions/admin";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  commision: z.coerce.number().min(1, { message: "Commision is required" }),
});

const CommisionForm = ({
  commision,
  settingsId,
}: {
  commision: number | null;
  settingsId: string;
}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);
  const toggleEdit = () => setIsEditing((prev) => !prev);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      commision: commision || 0,
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!settingsId) {
        await createCommision(values.commision);
      } else {
        await updateCommision(values.commision, settingsId);
      }
      toast.success("Commision updated successfully");
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
          <Label className="font-semibold">Commision (%)</Label>
          <Button size="sm" onClick={toggleEdit} variant="outline">
            {isEditing && <>Cancel</>}
            {!isEditing && (
              <>
                <PencilIcon className="w-4 h-4" />
                Edit commision
              </>
            )}
          </Button>
        </div>
        {!isEditing && (
          <div
            className={cn(
              "text-sm",
              !commision && "text-muted-foreground italic"
            )}
          >
            {!commision && "No commision provided"}
            {commision && `${commision}%`}
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
                name="commision"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        className="bg-white"
                        placeholder="e.g. '5'"
                      />
                    </FormControl>
                    <FormDescription>
                      This field automatically calculates the commission
                      deducted from every successful product transaction by a
                      seller.
                    </FormDescription>
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

export default CommisionForm;
