"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit,
  MoreHorizontal,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { updateProductStatus } from "@/actions/product";
import { Modal } from "@/components/ui/modal";
import { Label } from "@/components/ui/label";
import Heading from "@/components/ui/heading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface CellActionProps {
  id: string;
}

export const CellAction: React.FC<CellActionProps> = ({ id }) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [status, setStatus] = React.useState("");
  const [reason, setReason] = React.useState<string | null>(null);

  const updateStatus = async () => {
    setLoading(true);
    try {
      const res = await updateProductStatus(id, params.sellerId as string, status, reason as string);
      if (res.success) {
        toast.success(res.success);
        router.refresh();
        setOpen(false);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <Heading
          title="Are you absolutely sure?"
          description="This action can't be undone. This will permanently approve or reject the product."
        />
        <form className="mt-3">
          <div className="space-y-3">
            <div className="space-y-1">
              <Label>
                Status <span className="text-red-600">*</span>
              </Label>
              <Select defaultValue={status} onValueChange={setStatus}>
                <SelectTrigger className="border border-zinc-400">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Approved">Approve</SelectItem>
                  <SelectItem value="Rejected">Reject</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {status === "Rejected" && (
              <div className="space-y-1">
                <Label>
                  Reason for rejecting <span className="text-red-600">*</span>
                </Label>
                <Textarea
                  className="border-zinc-400"
                  placeholder="Please enter your reason here..."
                  value={reason ?? ""}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            )}
            <div className="flex justify-end items-center">
              <Button
                variant="ghost"
                className="mr-2"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                onClick={updateStatus}
                disabled={loading}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </Modal>
      <DropdownMenu>
        <DropdownMenuTrigger className="no-print" asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/admin/sellers/${params.sellerId}/products/${id}`)
            }
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            View Product
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Status
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
