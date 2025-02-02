"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useParams, usePathname } from "next/navigation";

const AppHeader = () => {
  const pathname = usePathname();
  const params = useParams();

  const segments = pathname
    .split("/")
    .filter(
      (segment) =>
        segment && segment !== "seller" && !/^[a-zA-Z0-9]{10,}$/.test(segment)
    );

  return (
    <header className="flex h-14 border-b shrink-0 items-center gap-2">
      <div className="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {pathname !== `/seller/${params.sellerId}/home` && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/seller/${params.sellerId}/home`}>
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            {segments.map((segment, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {index === segments.length - 1 ? (
                    <BreadcrumbPage className="capitalize">
                      {segment.replace(/-/g, " ")}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      href={`/${segments.slice(0, index + 1).join("/")}`}
                      className="capitalize"
                    >
                      {segment.replace(/-/g, " ")}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < segments.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default AppHeader;
