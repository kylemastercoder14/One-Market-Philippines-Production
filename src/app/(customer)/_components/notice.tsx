"use client";

import { ChevronRight, LockKeyhole, Truck, Wallet2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Notice = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col items-center justify-center">
          <Image
            alt="Guard"
            width={100}
            height={100}
            src="/icons/security.svg"
          />
          <h3 className="font-semibold mt-3">Security Reminder</h3>
          <p className="text-sm text-center">
            1 Market Philippines values your privacy and security. We will never
            send requests for extra payments by SMS or email. If you receive any
            requests claiming to be from 1 Market Philippines, we strongly
            suggest you ignore them and do not click on any links they may
            contain.
          </p>
          <Button onClick={() => setOpen(false)} className="w-full mt-5">
            Ok
          </Button>
          <Link
            className="flex items-center hover:underline gap-2 mt-5 text-muted-foreground text-sm"
            href="/report-suspicious"
          >
            <span>
              If you come across anything suspicious, please report it in time
            </span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </Modal>
      <div className="w-full cursor-pointer border border-green-600 rounded-md">
        <div className="bg-[#0A8800] hover:bg-[#0A8800]/90 flex items-center py-2 px-4 justify-between">
          <div className="flex items-center text-white gap-2">
            <Image alt="Guard" width={20} height={20} src="/icons/guard.svg" />
            <span className="text-sm">Why choose 1 Market Philippines?</span>
          </div>
          <div className="flex items-center gap-4 text-white">
            <div className="flex items-center gap-2 text-sm text-white">
              <LockKeyhole className="w-4 h-4" />
              <span className='lg:block hidden'>Security Privacy</span>
            </div>
            <span>|</span>
            <div className="flex items-center gap-2 text-sm text-white">
              <Wallet2 className="w-4 h-4" />
              <span className='lg:block hidden'>Safe Payments</span>
            </div>
            <span>|</span>
            <div className="flex items-center gap-2 text-sm text-white">
              <Truck className="w-4 h-4" />
              <span className='lg:block hidden'>Delivery Guarantee</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
        <div
          onClick={() => setOpen(true)}
          className="flex items-center hover:bg-zinc-100 justify-between py-2 px-4"
        >
          <div className="flex items-center text-white gap-2">
            <Image alt="Bell" width={20} height={20} src="/icons/bell.svg" />
            <span className="text-sm text-[#0A8800] font-semibold">
              Security reminder: Please be wary of scam messages and links. 1
              Market Philippines won&apos;t ask for extra free via SMS or email.
            </span>
          </div>
          <div className="lg:flex hidden items-center gap-1 text-sm text-[#0A8800]">
            <span>View</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Notice;
