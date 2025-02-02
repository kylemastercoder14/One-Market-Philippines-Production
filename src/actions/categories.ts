"use server";

import db from "@/lib/db";

export const createCategory = async (data: {
  name: string;
  slug: string;
  subCategories: string[];
}) => {
  if (!data || !data.name || !data.slug || !data.subCategories?.length) {
    return { error: "Please fill all required fields" };
  }

  try {
    const existingCategory = await db.category.findFirst({
      where: {
        OR: [
          {
            name: data.name,
          },
          {
            slug: data.slug,
          },
        ],
      },
    });

    if (existingCategory) {
      return { error: "Category name or slug already exists" };
    }

    // Create the main category
    const category = await db.category.create({
      data: {
        name: data.name,
        slug: data.slug,
      },
    });

    // Loop through subcategories
    for (const subCategory of data.subCategories) {
      if (!subCategory?.trim()) continue;

      // Create a new subcategory linked to this category, even if the name already exists elsewhere
      await db.subCategory.create({
        data: {
          name: subCategory.trim(),
          slug: `${data.slug}-${subCategory.trim().toLowerCase().replace(/\s+/g, "-")}`,
          categorySlug: category.slug,
        },
      });
    }

    return { success: "Category created successfully" };
  } catch (error) {
    console.error("Error creating category:", error);

    if (error instanceof Error) {
      return { error: `An error occurred: ${error.message}` };
    }

    return { error: "Something went wrong. Please try again." };
  }
};

export const updateCategory = async (data: {
  id: string;
  name: string;
  slug: string;
  subCategories: string[];
}) => {
  if (!data.name || !data.slug || !data.subCategories.length) {
    return { error: "Please fill all required fields" };
  }

  try {
    const res = await db.category.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        slug: data.slug,
      },
    });

    if (!res) {
      return { error: "Something went wrong. Please try again" };
    }

    await db.subCategory.deleteMany({
      where: {
        categorySlug: data.slug,
      },
    });

    await Promise.all(
      data.subCategories.map(async (subCategory) => {
        await db.subCategory.create({
          data: {
            name: subCategory,
            categorySlug: data.slug,
            slug: subCategory.trim().toLowerCase().replace(/\s+/g, "-"),
          },
        });
      })
    );

    return { success: "Category updated successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again" };
  }
};

export const deleteCategory = async (id: string) => {
  try {
    await db.category.delete({
      where: {
        id,
      },
    });

    return { success: "Category deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again" };
  }
};

export const getAllCategories = async () => {
  try {
    const categories = await db.category.findMany({
      include: {
        sellerSubCategory: true,
      },
    });

    return categories;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createSuggestedCategory = async (
  data: { title: string },
  sellerId: string
) => {
  if (!data.title) {
    return { error: "Please fill all required fields" };
  }

  if (!sellerId) {
    return { error: "Seller ID is required" };
  }

  try {
    const seller = await db.seller.findUnique({
      where: {
        id: sellerId,
      },
    });

    if (!seller) {
      return { error: "Seller not found" };
    }

    const existingCategory = await db.subCategory.findFirst({
      where: {
        name: data.title,
        categorySlug: seller.categorySlug || "",
      },
    });

    if (existingCategory) {
      return { error: "Category already exists" };
    }

    await db.adminNotification.create({
      data: {
        type: "Suggested Category",
        title: data.title,
        message: `${seller.name} suggested a new category: ${data.title}`,
        sellerId,
      },
    });

    return { success: "Category suggested successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again" };
  }
};
