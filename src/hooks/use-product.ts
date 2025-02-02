import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ProductVariantOptions {
  name: string;
  image?: string;
  price?: number;
  stock?: number;
}

interface ProductVariants {
  name?: string;
  options: ProductVariantOptions[];
}

interface ProductItem {
  name: string;
  slug: string;
  description: string;
  category: string;
  images: string[];
  brand?: string;
  materials: string[];
  weight?: number;
  height?: number;
  price?: number;
  sku: string;
  tags: string[];
  warrantyPeriod?: string;
  warrantyPolicy?: string;
  status: "In stock" | "Out of stock";
  sellerId: string;
  variants?: ProductVariants[];
}

interface ProductStore {
  items: ProductItem[];
  addItem: (data: ProductItem) => void;
  removeAll: () => void;
}

const useProduct = create(
  persist<ProductStore>(
    (set, get) => ({
      items: [],
      addItem: (data) => {
        const currentItems = get().items;
        const productIndex = currentItems.findIndex(
          (item) => item.slug === data.slug
        );

        if (productIndex === -1) {
          // Add new product if it doesn't exist
          set({ items: [...currentItems, data] });
        } else {
          // Update existing product's variants
          const updatedItems = [...currentItems];
          updatedItems[productIndex] = {
            ...currentItems[productIndex],
            ...data, // Merge existing data with new data
            variants: data.variants, // Replace variants explicitly
          };

          set({ items: updatedItems });
          toast.success("Product variants updated successfully!");
        }
      },

      removeAll: () => {
        set({ items: [] });
      },
    }),
    {
      name: "product-seller-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useProduct;
