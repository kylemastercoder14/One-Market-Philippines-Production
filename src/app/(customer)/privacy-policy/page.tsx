import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import db from "@/lib/db";
import { format } from "date-fns";

const PrivacyPolicy = async () => {
  const privacyPolicy = await db.adminPolicies.findMany({});
  return (
    <div className='pb-10'>
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
              Privacy Policy
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-center mt-10 text-2xl font-bold">
        1 Market Philippines | Privacy Policy
      </h1>
      <p className="text-center mt-3 text-muted-foreground">
        Effective Date:{" "}
        {format(new Date(privacyPolicy[0].updatedAt), "MMMM dd, yyyy")}
      </p>
      <div
        className="px-10 md:px-[200px] mt-8 space-y-3 text-gray-700 leading-loose"
        dangerouslySetInnerHTML={{ __html: privacyPolicy[0].privacy || "" }}
      />
    </div>
  );
};

export default PrivacyPolicy;
