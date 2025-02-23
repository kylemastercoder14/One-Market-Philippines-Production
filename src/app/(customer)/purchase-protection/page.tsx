import Image from "next/image";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const PurchaseProtection = () => {
  return (
    <div>
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
              Purchase Protection
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative bg-[#d4969633] mt-5 w-full h-[20vh]">
        <div className="md:px-80 px-40 pt-14 flex items-center gap-3">
          <Image
            src="/icons/protection.svg"
            alt="Protection"
            width={80}
            height={80}
          />
          <div>
            <p className="text-2xl text-[#ab0000] font-semibold">
              Shop Confidently with 1 Market Philippines Purchase Protection
              Program
            </p>
            <p className="text-[#ab0000] text-sm mt-1">
              Get a full refund if your item {"can't"} be delivered, arrives
              damaged, or {"isn't"} as described. You may be asked to send the
              item back before your refund can be issued.
            </p>
          </div>
        </div>
      </div>
	  <section className="mt-10 md:px-[500px] grid md:grid-cols-5 pb-10 grid-cols-1 gap-5 px-10">
		<div className="md:col-span-3">
			<div className='mb-10'>
				<h1 className='font-bold text-lg'>1 Market Philippines Purchase Protection Program</h1>
				<p className='text-muted-foreground mt-2 text-sm'>Easily get help in the rare case that something goes wrong when shopping from a small business</p>
			</div>
			<div className=''>
				<h1 className='font-bold text-lg'>{"What's"} eligible for Purchase Protection Program</h1>
				<ul className='list-disc pl-5 mt-2 text-muted-foreground text-sm'>
					<li>Your order {"doesn't"} match the item descriptions or photos</li>
					<li>Your item arrived damaged</li>
					<li>Your item {"couldn't"} be delivered or arrived late</li>
				</ul>
			</div>
		</div>
		<div className="md:col-span-2">
			<Image src="https://aimg.kwcdn.com/upload_aimg/pc/4d2bc087-fc46-4d2f-ad80-078961419209.png.slim.png?imageView2/2/w/800/q/70/format/webp" alt="Protection" width={600} height={600} />
		</div>
	  </section>
    </div>
  );
};

export default PurchaseProtection;
