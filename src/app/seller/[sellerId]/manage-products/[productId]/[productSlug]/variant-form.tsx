"use client";

import React, { useState } from "react";
import useProduct from "@/hooks/use-product";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import VariantImageUpload from "@/components/globals/variant-image-upload";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  createNonFoodProductWithVariants,
  updateNonFoodProductWithVariants,
} from "@/actions/product";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/ui/alert-modal";
import {
  SellerProductVariants,
  SellerProductVariantsOptions,
} from "@prisma/client";

interface VariantProps extends SellerProductVariants {
  sellerProductVariantsOptions: SellerProductVariantsOptions[];
}

const VariantForm = ({
  productSlug,
  initialVariants,
}: {
  productSlug: string;
  initialVariants: VariantProps[];
}) => {
  const params = useParams();
  const items = useProduct((state) => state.items);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const addItem = useProduct((state) => state.addItem);
  const deleteAllItem = useProduct((state) => state.removeAll);
  const router = useRouter();
  const decodedSlug = decodeURIComponent(productSlug);
  const productIndex = items.findIndex((item) => item.slug === decodedSlug);
  const product = items[productIndex];

  const [variants, setVariants] = useState(
    initialVariants.length > 0
      ? initialVariants.map((variant) => ({
          id: variant.id, // Include variant ID for existing variants
          name: variant.name || "",
          options: variant.sellerProductVariantsOptions.map((option) => ({
            id: option.id, // Include option ID for existing options
            name: option.name || "",
            price: option.price ?? 0,
            stock: option.stock ?? 0,
            image: option.image || "",
          })),
        }))
      : [{ name: "", options: [{ name: "", price: 0, stock: 0, image: "" }] }]
  );

  const handleAddVariant = () => {
    setVariants([
      ...variants,
      { name: "", options: [{ name: "", price: 0, stock: 0, image: "" }] },
    ]);
  };

  const handleAddOption = (variantIndex: number) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].options.push({
      id: "",
      name: "",
      price: 0,
      stock: 0,
      image: "",
    });
    setVariants(updatedVariants);
  };

  const handleDeleteOption = (variantIndex: number, optionIndex: number) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].options.splice(optionIndex, 1);
    setVariants(updatedVariants);
  };

  const handleDeleteVariant = (variantIndex: number) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(variantIndex, 1);
    setVariants(updatedVariants);
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    console.log("Variants payload:", variants); // Log the payload
    try {
      if (initialVariants) {
        const res = await updateNonFoodProductWithVariants(productSlug, {
          variants, // Pass variants as part of an object
        });
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success(res.success);
          router.push(`/seller/${params.sellerId}/manage-products`);
        }
      } else {
        const updatedProduct = { ...product, variants };
        addItem(updatedProduct);
        const res = await createNonFoodProductWithVariants(updatedProduct);
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success(res.success);
          deleteAllItem();
          router.push(`/seller/${res.sellerId}/manage-products`);
        }
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product variants");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    deleteAllItem();
    router.push(`/seller/${product.sellerId}/manage-products`);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleCancel}
        title="Are you sure you want to cancel?"
        description="This action cannot be undone. If you proceed, all changes will be lost."
      />
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveChanges();
          }}
        >
          {variants.map((variant, variantIndex) => (
            <div
              key={variantIndex}
              className="bg-white dark:bg-zinc-900 border shadow rounded-md p-3 mt-4"
            >
              <div className="space-y-2 mb-4">
                <Label>Variant Name</Label>
                <Select
                  disabled={loading}
                  defaultValue={variant.name}
                  onValueChange={(value) => {
                    const updatedVariants = [...variants];
                    updatedVariants[variantIndex].name = value;
                    setVariants(updatedVariants);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a variant name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Color">Color</SelectItem>
                    <SelectItem value="Size">Size</SelectItem>
                    <SelectItem value="Theme">Theme</SelectItem>
                    <SelectItem value="Occasion">Occasion</SelectItem>
                    <SelectItem value="Season">Season</SelectItem>
                    <SelectItem value="Flavor">Flavor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {variant.options.map((option, optionIndex) => (
                <div key={optionIndex} className="space-y-3 mb-3">
                  <div className="flex items-center w-full gap-3">
                    <div className="space-y-2 w-full">
                      <Label>Option Name</Label>
                      <Input
                        disabled={loading}
                        value={option.name}
                        onChange={(e) => {
                          const updatedVariants = [...variants];
                          updatedVariants[variantIndex].options[
                            optionIndex
                          ].name = e.target.value;
                          setVariants(updatedVariants);
                        }}
                        placeholder="e.g. 'S, Red, Dark'"
                      />
                    </div>
                    <div className="space-y-2 w-full">
                      <Label>Price (₱)</Label>
                      <Input
                        disabled={loading}
                        type="number"
                        value={option.price}
                        onChange={(e) => {
                          const updatedVariants = [...variants];
                          updatedVariants[variantIndex].options[
                            optionIndex
                          ].price = Number(e.target.value);
                          setVariants(updatedVariants);
                        }}
                        placeholder="e.g. '500'"
                      />
                    </div>

                    <div className="space-y-2 w-full">
                      <Label>Stock</Label>
                      <Input
                        disabled={loading}
                        type="number"
                        value={option.stock}
                        onChange={(e) => {
                          const updatedVariants = [...variants];
                          updatedVariants[variantIndex].options[
                            optionIndex
                          ].stock = Number(e.target.value);
                          setVariants(updatedVariants);
                        }}
                        placeholder="e.g. '20'"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Image</Label>
                    <VariantImageUpload
                      disabled={loading}
                      defaultValue={option.image}
                      onVariantImageUpload={(image) => {
                        const updatedVariants = [...variants];
                        updatedVariants[variantIndex].options[
                          optionIndex
                        ].image = image;
                        setVariants(updatedVariants);
                      }}
                    />
                  </div>
                  <Button
                    disabled={loading}
                    size="sm"
                    variant="ghost"
                    type="button"
                    onClick={() =>
                      handleDeleteOption(variantIndex, optionIndex)
                    }
                  >
                    Delete Option
                  </Button>
                </div>
              ))}
              <Button
                disabled={loading}
                size="sm"
                type="button"
                onClick={() => handleAddOption(variantIndex)}
              >
                + Add Another Option
              </Button>
              <Separator className="my-4" />
              <Button
                disabled={loading}
                size="sm"
                variant="ghost"
                type="button"
                onClick={() => handleDeleteVariant(variantIndex)}
              >
                Delete Variant
              </Button>
            </div>
          ))}
          <Button
            disabled={loading}
            variant="ghost"
            type="button"
            onClick={handleAddVariant}
            className="hover:bg-transparent text-orange-600 hover:text-orange-600/90"
          >
            + Add Another Variant
          </Button>
          <div className="flex gap-2 mt-5 items-center justify-end">
            <Button type="submit" disabled={loading}>
              Save Changes
            </Button>
            <Button
              onClick={() => {
                if (initialVariants) {
                  router.back();
                } else {
                  setOpen(true);
                }
              }}
              disabled={loading}
              variant="ghost"
              type="button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default VariantForm;
