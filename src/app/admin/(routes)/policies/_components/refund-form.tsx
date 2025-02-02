"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
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
import { createRefundPolicy, updateRefundPolicy } from "@/actions/admin";
import { cn } from "@/lib/utils";
import Editor from "@/components/globals/editor";
import Preview from "@/components/globals/preview";

const formSchema = z.object({
  refund: z.string().min(1, { message: "Refund policy is required" }),
});

const RefundForm = ({
  refund,
  policyId,
}: {
  refund: string | null;
  policyId: string;
}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);
  const toggleEdit = () => setIsEditing((prev) => !prev);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      refund: refund || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!policyId) {
        await createRefundPolicy(values.refund);
      } else {
        await updateRefundPolicy(values.refund, policyId);
      }
      toast.success("Refund policy updated successfully");
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Card className="mt-2">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <Label className="font-semibold">Refund Policy</Label>
          <Button size="sm" onClick={toggleEdit} variant="outline">
            {isEditing && <>Cancel</>}
            {!isEditing && (
              <>
                <PencilIcon className="w-4 h-4" />
                Edit refund policy
              </>
            )}
          </Button>
        </div>
        {!isEditing && (
          <div
            className={cn(
              "text-sm",
              !refund && "text-muted-foreground italic"
            )}
          >
            {!refund && "No refund policy provided"}
            {refund && <Preview value={refund} />}
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
                name="refund"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Editor {...field} />
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

export default RefundForm;
