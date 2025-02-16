"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Seller, SellerAddress, SellerBank } from "@prisma/client";
import { Clock, DownloadIcon, EyeIcon } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Modal } from '@/components/ui/modal';
import Heading from '@/components/ui/heading';

export interface SellerWithProps extends Seller {
  sellerAddress: SellerAddress[];
  sellerBank: SellerBank[];
}

const AttachmentsClient = ({ seller }: { seller: SellerWithProps | null }) => {
  const pathname = usePathname();
  const router = useRouter();
  const fileName = (url: string) => url.split("/").pop();

  const [openModal, setOpenModal] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState({
    url: "",
    name: "",
  });
  return (
    <>
      <Modal
        className="max-w-4xl"
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Heading title={selectedImage.name} description="" />
        <div className="relative w-full h-[60vh]">
          <Image
            src={selectedImage.url}
            alt={selectedImage.name}
            fill
            className="w-full h-full object-contain"
          />
        </div>
        <Button
          className="mt-2 flex justify-end ml-auto items-center"
          onClick={() => setOpenModal(false)}
        >
          Okay
        </Button>
      </Modal>
      <div className="grid mt-5 md:grid-cols-10 grid-cols-1 gap-10">
        <div className="w-full flex space-y-1 flex-col md:col-span-2">
          <Link
            href={`/seller/${seller?.id}/settings`}
            className={`px-3 py-2 w-full rounded-md hover:underline ${pathname === `/seller/${seller?.id}/settings` ? "bg-accent font-semibold hover:no-underline" : ""}`}
          >
            Profile
          </Link>
          <Link
            href={`/seller/${seller?.id}/settings/attachments`}
            className={`px-3 py-2 w-full rounded-md hover:underline ${pathname === `/seller/${seller?.id}/settings/attachments` ? "bg-accent" : ""}`}
          >
            Attachments
          </Link>
          <Link
            href={`/seller/${seller?.id}/settings/policies`}
            className={`px-3 py-2 w-full rounded-md hover:underline ${pathname === `/seller/${seller?.id}/settings/policies` ? "bg-accent" : ""}`}
          >
            Policies
          </Link>
          <Link
            href={`/seller/${seller?.id}/settings/payment-accounts`}
            className={`px-3 py-2 w-full rounded-md hover:underline ${pathname === `/seller/${seller?.id}/settings/payment-accounts` ? "bg-accent" : ""}`}
          >
            Payment Accounts
          </Link>
          <Link
            href={`/seller/${seller?.id}/settings/appearance`}
            className={`px-3 py-2 w-full rounded-md hover:underline ${pathname === `/seller/${seller?.id}/settings/appearance` ? "bg-accent" : ""}`}
          >
            Appearance
          </Link>
        </div>
        <div className="md:col-span-5 w-full">
          <div>
            <h1 className="font-semibold text-lg">Attachments</h1>
            <p className="text-muted-foreground text-sm">
              This is how admin will see your uploaded documents.
            </p>
          </div>
          <Separator className="my-5" />
          <div className="flex items-center justify-between rounded-md mt-3 py-2 px-3 bg-zinc-200 dark:bg-zinc-900">
            <div className="flex items-center gap-2">
              <div className="bg-black dark:bg-zinc-200 rounded-md p-2">
                <Clock className="w-3 h-3 text-white dark:text-black" />
              </div>
              <span className="text-sm font-semibold">Date Created:</span>
            </div>
            <span className="text-sm">
              {seller?.createdAt
                ? format(new Date(seller.createdAt), "MMMM d, yyyy 'at' h:mm a")
                : "N/A"}
            </span>
          </div>
          <div className="flex flex-col space-y-4 mt-5">
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
                  <span className="text-sm">{fileName(seller?.bir || "")}</span>
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
                  <span className="text-sm">{fileName(seller?.dti || "")}</span>
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
                  <span className="text-sm">{fileName(seller?.sec || "")}</span>
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
      </div>
    </>
  );
};

export default AttachmentsClient;
