"use client";

import Image from "next/image";
import React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "../ui/button";

const ReviewsBanner = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col items-center justify-center">
          <Image
            alt="Review"
            width={100}
            height={100}
            src="/icons/review.svg"
          />
          <h3 className="font-semibold mt-3">
            All reviews are from verified users.
          </h3>
          <p className="text-sm text-center">
            1 Market Philippines only displays reviews from verified users. This
            means that the reviews you see on our platform are from customers
            who have actually purchased the product.
          </p>
          <Button onClick={() => setOpen(false)} className="w-full mt-5">
            Ok
          </Button>
        </div>
      </Modal>
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer border hover:bg-accent border-[#0A8800] rounded-md"
      >
        <div className="flex items-center py-2 px-4 justify-between">
          <div className="flex items-center text-[#0A8800] gap-2">
            <Image
              alt="Review"
              width={20}
              height={20}
              src="/icons/review.svg"
            />
            <span className="text-sm">
              All reviews are from verified users.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewsBanner;
