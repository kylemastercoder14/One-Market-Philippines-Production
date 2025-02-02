import React from "react";
import db from "@/lib/db";
import CategoryForm from "./category-form";

const CategoryId = async (props: {
  params: Promise<{
    categoryId: string;
  }>;
}) => {
  const params = await props.params;
  const data = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
    include: {
      seller: true,
      sellerSubCategory: true,
    },
  });

  return (
    <div>
      <CategoryForm initialData={data} />
    </div>
  );
};

export default CategoryId;
