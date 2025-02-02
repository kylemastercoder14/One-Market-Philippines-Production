import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const SubCategoryPage = async ({
  params,
}: {
  params: { categorySlug: string; subCategorySlug: string };
}) => {
  // Replace hyphens with spaces and decode URL-encoded characters
  const formattedCategory = params.categorySlug
    ? decodeURIComponent(params.categorySlug.replace(/-/g, " "))
    : "";

  // Remove the category part from subCategory, replace hyphens with spaces, and decode URL-encoded characters
  const formattedSubCategory = params.subCategorySlug
    ? decodeURIComponent(
        params.subCategorySlug
          .replace(`${params.categorySlug}-`, "")
          .replace(/-/g, " ")
      )
    : "";

  return (
    <div className="md:px-[200px] px-10 pb-20 pt-24">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="capitalize">
            <BreadcrumbLink href={`/products/${params.categorySlug}`}>
              {formattedCategory}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="capitalize">
            <BreadcrumbPage>{formattedSubCategory}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default SubCategoryPage;
