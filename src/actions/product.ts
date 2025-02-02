/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/db";

export const createNonFoodProductWithVariants = async (values: any) => {
  try {
    // Destructure product data
    const {
      name,
      slug,
      description,
      tags,
      category,
      images,
      brand,
      materials,
      weight,
      height,
      sku,
      warrantyPeriod,
      warrantyPolicy,
      sellerId,
      variants,
    } = values;

    // Check for an existing product with the same name and sellerId
    const existingProduct = await db.sellerProduct.findFirst({
      where: { name, sellerId },
    });

    if (existingProduct) {
      return { error: "Product with this name already exists" };
    }

    // Create the main product
    const createdProduct = await db.sellerProduct.create({
      data: {
        name,
        slug,
        description,
        tags,
        category,
        images,
        brand,
        materials,
        weight,
        height,
        sku,
        warrantyPeriod,
        warrantyPolicy,
        sellerId,
      },
    });

    // Create variants and their options if provided
    if (variants && variants.length > 0) {
      for (const variant of variants) {
        const createdVariant = await db.sellerProductVariants.create({
          data: {
            name: variant.name,
            sellerProductSlug: createdProduct.slug,
          },
        });

        if (variant.options && variant.options.length > 0) {
          for (const option of variant.options) {
            await db.sellerProductVariantsOptions.create({
              data: {
                name: option.name,
                image: option.image || null,
                price: option.price || 0,
                stock: option.stock || 0,
                sellerProductVariantsId: createdVariant.id,
              },
            });
          }
        }
      }
    }

    return {
      success: "Product created successfully",
      product: createdProduct,
      sellerId: sellerId,
    };
  } catch (error: any) {
    console.error("Error creating product:", error.message, error.stack);
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

export const updateNonFoodProductWithVariants = async (
  productSlug: string,
  values: { variants: any } // Expect an object with a `variants` property
) => {
  try {
    const { variants } = values; // Destructure `variants` from `values`
    console.log("Received variants:", variants); // Log received variants

    if (variants && variants.length > 0) {
      for (const variant of variants) {
        console.log("Processing variant:", variant); // Log each variant
        const updatedVariant = await db.sellerProductVariants.upsert({
          where: {
            id: variant.id || "",
          },
          update: {
            name: variant.name,
          },
          create: {
            name: variant.name,
            sellerProductSlug: productSlug,
          },
        });

        if (variant.options && variant.options.length > 0) {
          for (const option of variant.options) {
            console.log("Processing option:", option); // Log each option
            if (option.id) {
              await db.sellerProductVariantsOptions.update({
                where: {
                  id: option.id,
                },
                data: {
                  name: option.name,
                  image: option.image || null,
                  price: option.price || 0,
                  stock: option.stock || 0,
                },
              });
            } else {
              await db.sellerProductVariantsOptions.create({
                data: {
                  name: option.name,
                  image: option.image || null,
                  price: option.price || 0,
                  stock: option.stock || 0,
                  sellerProductVariantsId: updatedVariant.id,
                },
              });
            }
          }
        }
      }
    }

    return {
      success: "Variant updated successfully",
    };
  } catch (error: any) {
    console.error("Error updating product:", error.message, error.stack);
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

export const createNonFoodProduct = async (values: any, sellerId: string) => {
  try {
    // Destructure product data
    const {
      title,
      slug,
      description,
      tags,
      category,
      media,
      price,
      brand,
      materials,
      weight,
      height,
      sku,
      warrantyPeriod,
      warrantyPolicy,
    } = values;

    // Check for an existing product with the same name and sellerId
    const existingProduct = await db.sellerProduct.findFirst({
      where: { name: title, sellerId },
    });

    if (existingProduct) {
      return { error: "Product with this name already exists" };
    }

    // Create the main product
    const createdProduct = await db.sellerProduct.create({
      data: {
        name: title,
        slug,
        description,
        tags,
        category,
        images: media,
        price,
        brand,
        materials,
        weight,
        height,
        sku,
        warrantyPeriod,
        warrantyPolicy,
        sellerId,
      },
    });

    return {
      success: "Product created successfully",
      product: createdProduct,
    };
  } catch (error: any) {
    console.error("Error creating product:", error.message, error.stack);
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

export const updateNonFoodProduct = async (
  values: any,
  productId: string,
  sellerId: string
) => {
  try {
    // Destructure product data
    const {
      title,
      slug,
      description,
      tags,
      category,
      media,
      price,
      brand,
      materials,
      weight,
      height,
      sku,
      warrantyPeriod,
      warrantyPolicy,
    } = values;

    // Check for an existing product with the same name and sellerId
    const existingProduct = await db.sellerProduct.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return { error: "Product does not exist" };
    }

    // Create the main product
    const updatedProduct = await db.sellerProduct.update({
      data: {
        name: title,
        slug,
        description,
        tags,
        category,
        images: media,
        price,
        brand,
        materials,
        weight,
        height,
        sku,
        warrantyPeriod,
        warrantyPolicy,
        sellerId,
      },
      where: {
        id: productId,
      },
    });

    return {
      success: "Product updated successfully",
      product: updatedProduct,
    };
  } catch (error: any) {
    console.error("Error updating product:", error.message, error.stack);
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    // Check for an existing product with the same name and sellerId
    const existingProduct = await db.sellerProduct.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return { error: "Product does not exist" };
    }

    // Delete the main product
    await db.sellerProduct.delete({
      where: {
        id: productId,
      },
    });

    return {
      success: "Product deleted successfully",
    };
  } catch (error: any) {
    console.error("Error deleting product:", error.message, error.stack);
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
