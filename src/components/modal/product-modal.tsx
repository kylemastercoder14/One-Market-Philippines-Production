/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { CheckIcon, CopyIcon, SearchIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import {
  SellerProduct,
  SellerProductVariants,
  SellerProductVariantsOptions,
  SubCategory,
} from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProductWithVariantsOptions extends SellerProductVariants {
  sellerProductVariantsOptions: SellerProductVariantsOptions[];
}

interface ProductWithVariants extends SellerProduct {
  sellerProductVariants: ProductWithVariantsOptions[];
}

const ProductModal = ({
  products,
  isOpen,
  onClose,
  categories,
  selectedProducts,
  setSelectedProducts,
}: {
  products: ProductWithVariants[];
  isOpen: boolean;
  onClose: () => void;
  categories: SubCategory[];
  selectedProducts: ProductWithVariants[];
  setSelectedProducts: (products: ProductWithVariants[]) => void;
}) => {
  const [localSelectedProducts, setLocalSelectedProducts] =
    React.useState<ProductWithVariants[]>(selectedProducts);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [itemsPerPage, setItemsPerPage] = React.useState(50);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isOnCopy, setIsOnCopy] = React.useState(false);

  const handleSelectProduct = (product: ProductWithVariants) => {
    setLocalSelectedProducts((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const onCopy = (slug: string) => {
    navigator.clipboard.writeText(slug);
    setIsOnCopy(true);
    window.setTimeout(() => {
      setIsOnCopy(false);
    }, 1000);
  };

  const handleDone = () => {
    setSelectedProducts(localSelectedProducts);
    onClose();
  };

  const filteredProducts = React.useMemo(() => {
    return products
      .filter((product) =>
        selectedCategory === "all" || selectedCategory === ""
          ? true
          : product.category === selectedCategory
      )
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [products, selectedCategory, searchTerm]);

  const paginatedProducts = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);
  return (
    <Modal className="max-w-4xl" isOpen={isOpen} onClose={onClose}>
      <h1 className="font-semibold text-lg">Select Products</h1>
      <div className="grid md:grid-cols-5 gap-5 grid-cols-1 mt-3">
        <div className="md:col-span-2">
          <Select
            defaultValue={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-3 relative">
          <Input
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="absolute w-4 h-4 top-2.5 right-3 text-gray-400" />
        </div>
      </div>
      <div className="mt-3 overflow-y-auto border rounded-xl shadow min-h-[50vh]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={
                    localSelectedProducts.length === paginatedProducts.length
                  }
                  onCheckedChange={(checked) =>
                    setLocalSelectedProducts(checked ? paginatedProducts : [])
                  }
                />
              </TableHead>
              <TableHead className="w-[500px]">Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Availability</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.map((product) => {
              // Flatten all options to find the minimum price but exclude the zero prices
              const lowestPrice = product.sellerProductVariants.reduce(
                (acc, variant) => {
                  const price = variant.sellerProductVariantsOptions.reduce(
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
                      checked={localSelectedProducts.some(
                        (p) => p.id === product.id
                      )}
                      onCheckedChange={() => handleSelectProduct(product)}
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
                        <p className="line-clamp-2 text-sm">{product.name}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">
                            ID: {product.id}
                          </p>
                          {isOnCopy ? (
                            <CheckIcon className="w-3 h-3 cursor-pointer" />
                          ) : (
                            <CopyIcon
                              onClick={() => onCopy(product.id)}
                              className="w-3 h-3 cursor-pointer"
                            />
                          )}
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
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="grid md:grid-cols-10 grid-cols-1 gap-5 mt-5">
        <div className="md:col-span-7">
          <p className='text-muted-foreground'>{localSelectedProducts.length}/500 products selected</p>
        </div>
        <div className="md:col-span-3">
          <Select
            onValueChange={(value) => setItemsPerPage(Number(value))}
            defaultValue={itemsPerPage.toString()}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="50 items per page" />
            </SelectTrigger>
            <SelectContent>
              {[50, 100, 300, 500].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} items per page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center justify-end mt-7 gap-2">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleDone}>Done</Button>
      </div>
    </Modal>
  );
};

export default ProductModal;
