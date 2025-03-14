import { z } from "zod";

export const NonFoodProductValidators = z.object({
  title: z
    .string()
    .min(1, { message: "Product name is required" })
    .max(100, { message: "Product name can't be more than 100 characters" }),
  description: z
    .string()
    .min(1, { message: "Product description is required" }),
  price: z.coerce.number().optional(),
  status: z.enum(["In stock", "Out of stock"], {
    message: "Status is required",
  }),
  tags: z.array(z.string()).nonempty("Please at least one tag"),
  subCategorySlug: z.string().min(1, { message: "Category is required" }),
  warrantyPeriod: z.string().optional(),
  warrantyPolicy: z.string().optional(),
  media: z
    .array(
      z.union([z.string().url(), z.instanceof(File)]).refine(
        (file) => {
          if (typeof file === "string") {
            return true; // URL is fine
          } else if (file instanceof File) {
            return file.size < 5 * 1024 * 1024; // Validate file size
          }
          return false;
        },
        {
          message: "Image size must be less than 5MB",
        }
      )
    )
    .nullable(),
  brand: z.string().optional(),
  materials: z.array(z.string()).nonempty("Please at least one material"),
  height: z.coerce.number().optional(),
  weight: z.coerce.number().optional(),
  sku: z.string().min(1, { message: "SKU is required" }),
  isVariant: z.boolean().optional().default(false),
  slug: z.string().optional(),
});

export const ServiceValidators = z.object({
  title: z
    .string()
    .min(1, { message: "Service name is required" })
    .max(100, { message: "Service name can't be more than 100 characters" }),
  description: z
    .string()
    .min(1, { message: "Service description is required" }),
  price: z.coerce.number().min(1, { message: "Price is required" }),
  status: z.enum(["In stock", "Out of stock"], {
    message: "Status is required",
  }),
  tags: z.array(z.string()).nonempty("Please at least one tag"),
  subCategorySlug: z.string().min(1, { message: "Category is required" }),
  media: z
    .array(
      z.union([z.string().url(), z.instanceof(File)]).refine(
        (file) => {
          if (typeof file === "string") {
            return true; // URL is fine
          } else if (file instanceof File) {
            return file.size < 5 * 1024 * 1024; // Validate file size
          }
          return false;
        },
        {
          message: "Image size must be less than 5MB",
        }
      )
    )
    .nullable(),
  sku: z.string().min(1, { message: "SKU is required" }),
  isVariant: z.boolean().optional().default(false),
  slug: z.string().optional(),
});

export const SuggestCategoryValidators = z.object({
  title: z
    .string()
    .min(1, { message: "Category name is required" })
    .max(100, { message: "Category name can't be more than 100 characters" }),
});
