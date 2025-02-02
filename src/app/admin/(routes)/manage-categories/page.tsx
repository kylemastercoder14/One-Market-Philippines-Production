import React from "react";
import Heading from "@/components/ui/heading";
import AddCategory from "./_components/add-category";
import db from "@/lib/db";
import { CategoryColumn } from "./_components/column";
import { format } from "date-fns";
import CategoryClient from "./_components/client";

const ManageCategories = async () => {
  const data = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      sellerSubCategory: true,
      seller: true,
    },
  });

  const formattedData: CategoryColumn[] =
    data.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      subCategoryCount: item.sellerSubCategory.length,
      sellerCount: item.seller.length,
      createdAt: format(item.createdAt, "MMMM dd, yyyy hh:mm a"),
    })) || [];

  return (
    <div>
      <div className="flex md:items-center items-start gap-3 md:flex-row flex-col justify-between mb-4">
        <Heading
          title="Manage Categories"
          description="Easily manage your product or service categories with this intuitive interface. Each category supports multiple subcategories, allowing you to create a detailed and hierarchical structure for your offerings."
        />
        <AddCategory />
      </div>
      <CategoryClient data={formattedData} />
    </div>
  );
};

export default ManageCategories;
