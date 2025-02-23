"use client";

import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import SuspiciousForm from "@/components/forms/suspicious-form";
import FakeWebsiteForm from "@/components/forms/fake-website-form";
import FakeJobForm from "@/components/forms/fake-job-form";
import EncryptedBanner from "@/components/globals/encryted-banner";

const ReportSuspiciousClient = ({ userId }: { userId: string | null }) => {
  const [openSuspicious, setOpenSuspicious] = useState(false);
  const [openFakeWebsite, setOpenFakeWebsite] = useState(false);
  const [openFakeJob, setOpenFakeJob] = useState(false);
  return (
    <>
      <Modal
        className="max-w-3xl"
        isOpen={openSuspicious}
        onClose={() => setOpenSuspicious(false)}
      >
        <h1 className="font-bold text-center">Report something suspicious</h1>
        <EncryptedBanner />
        <SuspiciousForm
          onClose={() => setOpenSuspicious(false)}
          userId={userId}
        />
      </Modal>
      <Modal className="max-w-3xl" isOpen={openFakeWebsite} onClose={() => setOpenFakeWebsite(false)}>
        <h1 className="font-bold text-center">Report something suspicious</h1>
        <EncryptedBanner />
        <FakeWebsiteForm
          onClose={() => setOpenFakeWebsite(false)}
          userId={userId}
        />
      </Modal>
      <Modal className="max-w-3xl" isOpen={openFakeJob} onClose={() => setOpenFakeJob(false)}>
        <h1 className="font-bold text-center">Report something suspicious</h1>
        <EncryptedBanner />
        <FakeJobForm onClose={() => setOpenFakeJob(false)} userId={userId} />
      </Modal>
      <div className="pb-10">
        <Breadcrumb className="md:px-[200px] mt-24 px-10">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="text-zinc-500 hover:text-zinc-500/90"
                href="/"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-black">
                Report Something Suspicious
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="md:px-[200px] mt-10 px-10">
          <h1 className="mt-10 text-2xl font-bold">
            Report something suspicious
          </h1>
          <p className="text-muted-foreground mt-3">
            We promise to protect your privacy and data. If you come across any
            suspicious activity or have any concerns, please report them to us
            immediately through the options provided below. We will treat your
            report seriously. Thank you for your support and cooperation!
          </p>
          <p className="text-muted-foreground">
            If you have any non-suspicious reports, such as official activities
            and order after-sales, please contact{" "}
            <span className="underline text-red-800">
              1 Market {"Philippines'"} customer service.
            </span>
          </p>
          <p className="mt-5 font-semibold">
            Select a suspicious situation you encountered
          </p>
          <div className="mt-5 grid grid-cols-1 gap-x-10 gap-y-4">
            <div
              onClick={() => setOpenSuspicious(true)}
              className="border px-4 text-zinc-800 border-zinc-300 cursor-pointer hover:bg-accent py-4 rounded-sm flex items-center justify-between"
            >
              <p>Report a suspicious phone call, email, or SMS/text message</p>
              <ChevronRight className="size-4" />
            </div>
            <div
              onClick={() => setOpenFakeWebsite(true)}
              className="border px-4 text-zinc-800 border-zinc-300 cursor-pointer hover:bg-accent py-4 rounded-sm flex items-center justify-between"
            >
              <p>
                Report a fake website or app similar to 1 Market Philippines
              </p>
              <ChevronRight className="size-4" />
            </div>
            <div
              onClick={() => setOpenFakeJob(true)}
              className="border px-4 text-zinc-800 border-zinc-300 cursor-pointer hover:bg-accent py-4 rounded-sm flex items-center justify-between"
            >
              <p>
                Report fake job opportunities and other activities that
                impersonate 1 Market Philippines
              </p>
              <ChevronRight className="size-4" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportSuspiciousClient;
