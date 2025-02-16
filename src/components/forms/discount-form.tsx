"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import { ProductDiscountValidators } from "@/validators";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { SmartDatetimeInput } from "@/components/ui/smart-datetime-input";
import { CircleHelp, CopyIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import AlertModal from "@/components/ui/alert-modal";
import {
  SellerDiscount,
  SellerProduct,
  SellerProductVariants,
  SellerProductVariantsOptions,
  SubCategory,
} from "@prisma/client";
import ProductModal from "@/components/modal/product-modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { createProductDiscount, updateProductDiscount } from "@/actions/promotions";

interface ProductWithVariantsOptions extends SellerProductVariants {
  sellerProductVariantsOptions: SellerProductVariantsOptions[];
}

interface ProductWithVariants extends SellerProduct {
  sellerProductVariants: ProductWithVariantsOptions[];
}

interface DiscountsWithProducts extends SellerDiscount {
  products: SellerProduct[];
}

const ProductDiscountForm = ({
  sellerId,
  initialData,
  products,
  categories,
}: {
  sellerId: string;
  initialData: DiscountsWithProducts | null;
  products: ProductWithVariants[];
  categories: SubCategory[];
}) => {
  const router = useRouter();

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [productModal, setProductModal] = React.useState(false);
  const [selectedProducts, setSelectedProducts] = React.useState<
    ProductWithVariants[]
  >([]);
  const [selectedForBatchDelete, setSelectedForBatchDelete] = React.useState<
    string[]
  >([]);

  console.log("PRODUCTS", initialData?.products);

  // Initialize selectedProducts with initialData products
  React.useEffect(() => {
    if (initialData?.products) {
      const initialProducts = products.filter((product) =>
        initialData.products.some((p) => p.id === product.id)
      );
      setSelectedProducts(initialProducts);
    }
  }, [initialData, products]);

  const handleDelete = (id: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleBatchDelete = () => {
    setSelectedProducts((prev) =>
      prev.filter((product) => !selectedForBatchDelete.includes(product.id))
    );
    setSelectedForBatchDelete([]); // Clear the batch selection after deletion
  };

  const handleBatchSelection = (productId: string) => {
    setSelectedForBatchDelete((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const form = useForm<z.infer<typeof ProductDiscountValidators>>({
    resolver: zodResolver(ProductDiscountValidators),
    defaultValues: {
      name: initialData?.discount || "",
      startPeriod: initialData?.startDate
        ? new Date(initialData.startDate)
        : undefined,
      endPeriod: initialData?.endDate
        ? new Date(initialData.endDate)
        : undefined,
      type: initialData?.type || "",
      products: initialData?.products.map((product) => product.id) || [],
      value: initialData?.value || 0,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  React.useEffect(() => {
    form.setValue(
      "products",
      selectedProducts.map((product) => product.id)
    );
    form.trigger("products");
  }, [selectedProducts, form]);

  async function onSubmit(values: z.infer<typeof ProductDiscountValidators>) {
    const data = {
      ...values,
      products: selectedProducts,
    };
    try {
      if (initialData) {
        const res = await updateProductDiscount(data, sellerId, initialData.id);
        if (res.success) {
          toast.success(res.success);
          router.push(`/seller/${sellerId}/promotions/discounts`);
        } else {
          toast.error(res.error);
        }
      } else {
        const res = await createProductDiscount(data, sellerId);
        if (res.success) {
          toast.success(res.success);
          router.push(`/seller/${sellerId}/promotions/discounts`);
        } else {
          toast.error(res.error);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create product discount");
    }
  }
  return (
    <>
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={() =>
          router.push(`/seller/${sellerId}/promotions/discounts`)
        }
        title="Discard your changes?"
        description="
	  Are you sure you want to discard your changes? All unsaved changes will be lost.
	  "
      />
      <ProductModal
        isOpen={productModal}
        onClose={() => setProductModal(false)}
        products={products}
        categories={categories}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
      <div className="mt-7">
        <Form {...form}>
          <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="bg-white dark:bg-zinc-900 shadow-md rounded-lg p-4 border">
              <h1 className="font-semibold text-lg mb-4">Basic information</h1>
              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>
                        Promotion name <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Promotion name is not visible to buyers"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                  <FormField
                    control={form.control}
                    name="startPeriod"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel className="flex items-center">
                          Start date{" "}
                          <span className="text-red-600 ml-1 mr-2">*</span>{" "}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger type="button">
                                <CircleHelp className="w-4 h-4 cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent className="w-60">
                                <p>
                                  This is a smart input field, if you type
                                  &rsquo;tomorrow at 3pm&rsquo; it will
                                  automatically set the date and time for you.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <FormControl>
                          <SmartDatetimeInput
                            onValueChange={field.onChange}
                            name="datetime"
                            value={field.value}
                            placeholder="e.g. tomorrow at 3pm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endPeriod"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel className="flex items-center">
                          End date{" "}
                          <span className="text-red-600 ml-1 mr-2">*</span>{" "}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger type="button">
                                <CircleHelp className="w-4 h-4 cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent className="w-60">
                                <p>
                                  This is a smart input field, if you type
                                  &rsquo;one week from now&rsquo; it will
                                  automatically set the date and time for you.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <FormControl>
                          <SmartDatetimeInput
                            onValueChange={field.onChange}
                            name="datetime"
                            value={field.value}
                            placeholder="e.g. one week from now"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="flex items-center">
                          Discount type{" "}
                          <span className="text-red-600 ml-1 mr-2">*</span>{" "}
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex items-center space-x-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Percentage Off" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Percentage off
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Fixed Price" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Fixed price
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>
                          The price is reduced by a set percentage or a fixed
                          amount.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.watch("type") && (
                    <FormField
                      control={form.control}
                      name="value"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormLabel>
                            Discount details{" "}
                            <span className="mr-1 text-muted-foreground">
                              (
                              {form.watch("type") === "Percentage Off"
                                ? "% off"
                                : "₱"}
                              )
                            </span>
                            <span className="text-red-600">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              className="pl-3"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-900 shadow-md rounded-lg p-4 border mt-7">
              <h1 className="font-semibold text-lg">Products</h1>
              <p className="text-muted-foreground">
                Select products and set promotional prices
              </p>
              <Button
                disabled={isSubmitting}
                onClick={() => setProductModal(true)}
                type="button"
                variant="outline"
                className="mt-3 border-orange-600 bg-transparent hover:bg-transparent text-orange-600 hover:text-orange-600/80"
              >
                Select Products
              </Button>
              {/* show only if there are selected products. */}
              {selectedProducts.length > 0 && (
                <>
                  <Button
                    disabled={
                      isSubmitting || selectedForBatchDelete.length === 0
                    }
                    onClick={handleBatchDelete}
                    variant="destructive"
                    className="ml-2"
                  >
                    Batch Delete
                  </Button>
                  <div className="mt-3 overflow-y-auto border rounded-xl shadow min-h-[50vh]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">
                            <Checkbox
                              checked={
                                selectedForBatchDelete.length ===
                                  selectedProducts.length &&
                                selectedProducts.length > 0
                              }
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedForBatchDelete(
                                    selectedProducts.map((p) => p.id)
                                  );
                                } else {
                                  setSelectedForBatchDelete([]);
                                }
                              }}
                            />
                          </TableHead>
                          <TableHead className="w-[500px]">
                            Product Name
                          </TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Availability</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedProducts.map((product) => {
                          // Flatten all options to find the minimum price but exclude the zero prices
                          const lowestPrice =
                            product.sellerProductVariants.reduce(
                              (acc, variant) => {
                                const price =
                                  variant.sellerProductVariantsOptions.reduce(
                                    (acc, option) => {
                                      if (option.price === 0) {
                                        return acc;
                                      }

                                      return option.price !== null
                                        ? Math.min(acc, option.price)
                                        : acc;
                                    },
                                    Infinity
                                  );

                                return Math.min(acc, price);
                              },
                              Infinity
                            );

                          const isThereAPrice =
                            product.price !== null && product.price !== 0;
                          const priceWithVariants =
                            lowestPrice !== Infinity
                              ? `Starts at ₱${lowestPrice.toFixed(2)}`
                              : "Price unavailable";

                          const price = isThereAPrice
                            ? `₱${product.price?.toFixed(2) ?? "0.00"}`
                            : priceWithVariants;
                          return (
                            <TableRow key={product.id}>
                              <TableCell>
                                <Checkbox
                                  checked={selectedForBatchDelete.includes(
                                    product.id
                                  )}
                                  onCheckedChange={() =>
                                    handleBatchSelection(product.id)
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-start gap-2">
                                  <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    width={50}
                                    height={50}
                                    className="rounded-md"
                                  />
                                  <div>
                                    <p className="line-clamp-2 text-sm">
                                      {product.name}
                                    </p>
                                    <div className="flex items-center gap-2">
                                      <p className="text-sm text-muted-foreground">
                                        ID: {product.id}
                                      </p>
                                      <CopyIcon className="w-3 h-3 cursor-pointer" />
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <p>{price}</p>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-3 h-3 rounded-full ${product.status === "In stock" ? "bg-green-600" : "bg-red-600"}`}
                                  ></div>
                                  <span>{product.status}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Button
                                  type="button"
                                  onClick={() => handleDelete(product.id)}
                                  variant="ghost"
                                  className="text-orange-600 pl-0 hover:text-orange-600/80"
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center justify-end mt-5 gap-2">
              <Button
                disabled={isSubmitting}
                type="button"
                onClick={() => setAlertOpen(true)}
                variant="ghost"
              >
                Cancel
              </Button>
              <Button disabled={isSubmitting || !isValid}>
                {initialData ? "Save Changes" : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ProductDiscountForm;
