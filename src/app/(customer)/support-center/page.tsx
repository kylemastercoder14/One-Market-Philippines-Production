"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import HeaderDesign from "@/components/globals/header-design";
import { ChevronRight } from "lucide-react";
import { ACCOUNTHELP, MAINCONTENT, ORDERHELP, PRODUCTHELP, RETURNHELP, SHIPPINGHELP, TOPICS } from "@/data/support-center";
import AccordionContent from "@/components/globals/accordion-content";

const SupportCenter = () => {
  const [selectedTopic, setSelectedTopic] = useState("order");
  return (
    <>
      <div className="relative mt-20 w-full h-[20vh]">
        <Image
          src="/images/top-banner.webp"
          alt="Banner"
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute md:px-[200px] mt-5 px-10 top-0 left-0">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-zinc-400 hover:text-zinc-400/90"
                  href="/"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  Support Center
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <p className="text-4xl mt-5 text-white">Hi, how can we help you?</p>
          <p className="text-zinc-300 mt-2">
            Select a topic to get help with items, shipping, return or refund
            problems, etc.
          </p>
        </div>
      </div>
      <section className="mt-10 md:px-[200px] pb-20 px-10">
        <div className="flex items-center gap-4">
          <HeaderDesign />
          <h3 className="text-[#8D021F] font-black text-2xl font-costaBold">
            Recommended topics
          </h3>
          <HeaderDesign />
        </div>
        <div className="mt-5 grid md:grid-cols-2 grid-cols-1 gap-x-10 gap-y-4">
          {MAINCONTENT.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedTopic(item.id)}
              className="border px-4 text-zinc-800 border-zinc-300 cursor-pointer hover:bg-accent py-4 rounded-sm flex items-center justify-between"
            >
              <p>{item.label}</p>
              <ChevronRight className="size-4" />
            </div>
          ))}
        </div>
      </section>
      <section className="mt-10 md:px-[200px] pb-20 px-10">
        <div className="flex items-center gap-4">
          <HeaderDesign />
          <h3 className="text-[#8D021F] font-black text-2xl font-costaBold">
            All help topics
          </h3>
          <HeaderDesign />
        </div>
        <div className="grid md:grid-cols-10 mt-5 grid-cols-1 gap-10">
          <div className="md:col-span-2 flex flex-col gap-y-2">
            {TOPICS.map(({ id, label, icon: Icon }) => (
              <div
                key={id}
                className={`flex items-center rounded-sm px-2 py-2 justify-between gap-2 cursor-pointer ${selectedTopic === id ? "bg-accent" : "hover:bg-accent"}`}
                onClick={() => setSelectedTopic(id)}
              >
                <div className="flex text-sm items-center gap-2">
                  <Icon className="size-4" />
                  {label}
                </div>
                <ChevronRight className="size-4" />
              </div>
            ))}
          </div>
          <div className="md:col-span-8">
            {selectedTopic === "order" && (
              <div className="flex flex-col gap-4">
                {ORDERHELP.map((item, index) => {
                  const value = `order-${index}`;
                  return (
                    <AccordionContent
                      key={index}
                      title={item.title}
                      value={value}
                      description={item.description}
                    />
                  );
                })}
              </div>
            )}
			{selectedTopic === "shipping" && (
              <div className="flex flex-col gap-4">
                {SHIPPINGHELP.map((item, index) => {
                  const value = `shipping-${index}`;
                  return (
                    <AccordionContent
                      key={index}
                      title={item.title}
                      value={value}
                      description={item.description}
                    />
                  );
                })}
              </div>
            )}
			{selectedTopic === "return" && (
              <div className="flex flex-col gap-4">
                {RETURNHELP.map((item, index) => {
                  const value = `return-${index}`;
                  return (
                    <AccordionContent
                      key={index}
                      title={item.title}
                      value={value}
                      description={item.description}
                    />
                  );
                })}
              </div>
            )}
			{selectedTopic === "product" && (
              <div className="flex flex-col gap-4">
                {PRODUCTHELP.map((item, index) => {
                  const value = `product-${index}`;
                  return (
                    <AccordionContent
                      key={index}
                      title={item.title}
                      value={value}
                      description={item.description}
                    />
                  );
                })}
              </div>
            )}
			{selectedTopic === "account" && (
              <div className="flex flex-col gap-4">
                {ACCOUNTHELP.map((item, index) => {
                  const value = `account-${index}`;
                  return (
                    <AccordionContent
                      key={index}
                      title={item.title}
                      value={value}
                      description={item.description}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SupportCenter;
