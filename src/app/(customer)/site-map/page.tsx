import React from "react";
import db from "@/lib/db";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import HeaderDesign from "@/components/globals/header-design";
import Link from "next/link";

const Sitemap = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      sellerSubCategory: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });
  return (
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
            <BreadcrumbPage className="text-black">Sitemap</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-center mt-10 text-2xl font-bold">
        1 Market Philippines | Sitemap
      </h1>
      <div className="md:px-[200px] mt-10 px-10">
        <div className="flex items-center gap-4">
          <HeaderDesign />
          <h3 className="text-[#8D021F] font-black text-2xl font-costaBold">
            Products & Services Categories
          </h3>
          <HeaderDesign />
        </div>
        <div className="mt-10 w-full grid md:grid-cols-4 grid-cols-1 gap-x-18 gap-y-14">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="col-span-1 space-y-12">
              {categories
                .slice(
                  index * Math.ceil(categories.length / 4),
                  (index + 1) * Math.ceil(categories.length / 4)
                )
                .map((category) => (
                  <div key={category.id} className="w-full">
                    <Link
                      href={`/type/${category.slug}`}
                      className="font-semibold capitalize text-lg mb-5"
                    >
                      {category.name}
                    </Link>
                    <div className="space-y-2 flex flex-col mt-5">
                      {category.sellerSubCategory.map((subCategory) => (
                        <Link
                          href={`/category/${subCategory.name}`}
                          key={subCategory.id}
                          className="text-gray-600 capitalize text-sm"
                        >
                          {subCategory.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
