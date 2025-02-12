"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Seller,
  SellerProduct,
  SellerProductVariants,
  SellerProductVariantsOptions,
} from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import React from "react";
import { Clock, DownloadIcon, EyeIcon, Search } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { useRouter } from "next/navigation";
import Heading from "@/components/ui/heading";

interface ProductVariantProps extends SellerProductVariants {
  sellerProductVariantsOptions: SellerProductVariantsOptions[];
}

interface ProductProps extends SellerProduct {
  sellerProductVariants: ProductVariantProps[];
}

const StoreClient = ({
  seller,
  products,
}: {
  seller: Seller | null;
  products: ProductProps[];
}) => {
  const router = useRouter();
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState({
    url: "",
    name: "",
  });
  const fileName = (url: string) => url.split("/").pop();
  const image =
    "https://img.kwcdn.com/supplier-public-tag/1f13e183980/58186005-2bcb-4c92-97c0-814cf3cbf508_300x300.jpeg?imageView2/2/w/800/q/70/format/webp";
  return (
    <>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <Heading title={selectedImage.name} description="" />
        <div className="relative w-full h-[30vh]">
          <Image
            src={selectedImage.url}
            alt={selectedImage.name}
            fill
            className="w-full h-full"
          />
        </div>
        <Button
          className="mt-2 flex justify-end ml-auto items-center"
          onClick={() => setOpenModal(false)}
        >
          Okay
        </Button>
      </Modal>
      <div className="flex items-center py-2 justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={image}
            alt={seller?.name || ""}
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-lg flex items-center gap-3">
              {seller?.name}{" "}
              {seller?.isPremium && (
                <Badge className="bg-black hover:bg-black/90">
                  Pro Account
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">
              Business Type: {seller?.type}
            </p>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center justify-center">
              <span className="font-semibold">{products.length}</span>
              <p className="text-muted-foreground text-sm">Products</p>
            </div>
            <div className="bg-gray-800 w-[1px] h-6"></div>
            <div className="flex flex-col items-center justify-center">
              <span className="font-semibold">12.2K</span>
              <p className="text-muted-foreground text-sm">Sold</p>
            </div>
            <div className="bg-gray-800 w-[1px] h-6"></div>
            <div className="flex flex-col items-center justify-center">
              <span className="font-semibold">128</span>
              <p className="text-muted-foreground text-sm">Orders</p>
            </div>
          </div>
          <Button className="mt-3 w-full">Verify Seller</Button>
        </div>
      </div>
      <div className="flex justify-between items-center mt-5">
        <Tabs defaultValue="info">
          <TabsList>
            <TabsTrigger value="info">Information</TabsTrigger>
            <TabsTrigger value="items">Products</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <div className="flex w-full mt-3 flex-col">
              <h1 className="font-semibold">Seller Information</h1>
              <div className="flex w-full items-center justify-between rounded-md mt-3 py-2 px-3 bg-zinc-200">
                <div className="flex items-center gap-2 w-full">
                  <div className="bg-black rounded-md p-2">
                    <Clock className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-semibold">Date Created:</span>
                </div>
                <span className="w-full text-sm">
                  {seller?.createdAt
                    ? format(
                        new Date(seller.createdAt),
                        "MMMM d, yyyy 'at' h:mm a"
                      )
                    : "N/A"}
                </span>
              </div>
              <h1 className="font-semibold mt-4">Attachments</h1>
              <div className="flex flex-col space-y-4 mt-3">
                {seller?.identity && (
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Image
                        src={seller?.identity || ""}
                        alt="ID"
                        width={80}
                        height={80}
                        className="rounded-lg"
                      />
                      <div className="absolute text-xs bg-black/80 p-1 rounded-md text-white top-0 right-0">
                        {seller?.identityType}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm">
                        {fileName(seller?.identity || "")}
                      </span>
                      <div className="flex items-center">
                        <Button
                          onClick={() => {
                            setOpenModal(true);
                            setSelectedImage({
                              name: seller.identityType || "",
                              url: seller.identity || "",
                            });
                          }}
                          variant="ghost"
                          size="sm"
                        >
                          <EyeIcon className="w-4 h-4" /> View
                        </Button>
                        <Button
                          onClick={() => router.push(seller.identity || "")}
                          variant="ghost"
                          size="sm"
                        >
                          <DownloadIcon className="w-4 h-4" /> Download
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                {seller?.bir && (
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Image
                        src={seller?.bir || ""}
                        alt="BIR"
                        width={80}
                        height={80}
                        className="rounded-lg"
                      />
                      <div className="absolute text-xs bg-black/80 p-1 rounded-md text-white top-0 right-0">
                        BIR
                      </div>
                    </div>
                    <div>
                      <span className="text-sm">
                        {fileName(seller?.bir || "")}
                      </span>
                      <div className="flex items-center">
                        <Button
                          onClick={() => {
                            setOpenModal(true);
                            setSelectedImage({
                              name: "Bureau of Internal Revenue (BIR) Form 2303",
                              url: seller.bir || "",
                            });
                          }}
                          variant="ghost"
                          size="sm"
                        >
                          <EyeIcon className="w-4 h-4" /> View
                        </Button>
                        <Button
                          onClick={() => router.push(seller.bir || "")}
                          variant="ghost"
                          size="sm"
                        >
                          <DownloadIcon className="w-4 h-4" /> Download
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                {seller?.barangayBusinessPermit && (
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Image
                        src={seller?.barangayBusinessPermit || ""}
                        alt="BBP"
                        width={80}
                        height={80}
                        className="rounded-lg"
                      />
                      <div className="absolute text-xs bg-black/80 p-1 rounded-md text-white top-0 right-0">
                        BBP
                      </div>
                    </div>
                    <div>
                      <span className="text-sm">
                        {fileName(seller?.barangayBusinessPermit || "")}
                      </span>
                      <div className="flex items-center">
                        <Button
                          onClick={() => {
                            setOpenModal(true);
                            setSelectedImage({
                              name: "Barangay Business Permit",
                              url: seller.barangayBusinessPermit || "",
                            });
                          }}
                          variant="ghost"
                          size="sm"
                        >
                          <EyeIcon className="w-4 h-4" /> View
                        </Button>
                        <Button
                          onClick={() =>
                            router.push(seller.barangayBusinessPermit || "")
                          }
                          variant="ghost"
                          size="sm"
                        >
                          <DownloadIcon className="w-4 h-4" /> Download
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                {seller?.dti && (
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Image
                        src={seller?.dti || ""}
                        alt="DTI"
                        width={80}
                        height={80}
                        className="rounded-lg"
                      />
                      <div className="absolute text-xs bg-black/80 p-1 rounded-md text-white top-0 right-0">
                        DTI
                      </div>
                    </div>
                    <div>
                      <span className="text-sm">
                        {fileName(seller?.dti || "")}
                      </span>
                      <div className="flex items-center">
                        <Button
                          onClick={() => {
                            setOpenModal(true);
                            setSelectedImage({
                              name: "Department of Trade and Industry",
                              url: seller.dti || "",
                            });
                          }}
                          variant="ghost"
                          size="sm"
                        >
                          <EyeIcon className="w-4 h-4" /> View
                        </Button>
                        <Button
                          onClick={() => router.push(seller.dti || "")}
                          variant="ghost"
                          size="sm"
                        >
                          <DownloadIcon className="w-4 h-4" /> Download
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                {seller?.sec && (
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Image
                        src={seller?.sec || ""}
                        alt="SEC"
                        width={80}
                        height={80}
                        className="rounded-lg"
                      />
                      <div className="absolute text-xs bg-black/80 p-1 rounded-md text-white top-0 right-0">
                        SEC
                      </div>
                    </div>
                    <div>
                      <span className="text-sm">
                        {fileName(seller?.sec || "")}
                      </span>
                      <div className="flex items-center">
                        <Button
                          onClick={() => {
                            setOpenModal(true);
                            setSelectedImage({
                              name: "Securities and Exchange Commission",
                              url: seller.sec || "",
                            });
                          }}
                          variant="ghost"
                          size="sm"
                        >
                          <EyeIcon className="w-4 h-4" /> View
                        </Button>
                        <Button
                          onClick={() => router.push(seller.sec || "")}
                          variant="ghost"
                          size="sm"
                        >
                          <DownloadIcon className="w-4 h-4" /> Download
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="items">Change your password here.</TabsContent>
          <TabsContent value="reviews">Reviews.</TabsContent>
        </Tabs>
        <div className="bg-white border border-zinc-400 w-[300px] h-[40px] rounded-full flex items-center justify-between pr-1 pl-5 mr-3">
          <input
            type="text"
            className="bg-transparent border-none outline-none text-sm"
            placeholder="Search anything here..."
          />
          <button className="rounded-full py-2 px-4">
            <Search className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </>
  );
};

export default StoreClient;
