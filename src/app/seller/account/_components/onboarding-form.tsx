"use client";

import React, { Suspense, useState } from "react";
import BusinessType, { RadioGroup } from "./business-type";
import { CheckIcon, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import AlertModal from "@/components/ui/alert-modal";
import { toast } from "sonner";
import { finishingSellerData } from "@/actions/seller";
import SingleImageUpload from "@/components/globals/single-image-upload";
import { Category } from "@prisma/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import ComboBox from "@/components/ui/combo-box";

const formSchema = z
  .object({
    businessType: z.string().min(1, { message: "Business type is required" }),
    shopName: z
      .string()
      .min(1, { message: "Shop name is required" })
      .max(50, { message: "Shop name must be less than 50 characters" }),
    category: z.string().min(1, { message: "Category is required" }),
    identityType: z.string().optional(),
    identity: z.string().optional(),
    dti: z.string().optional(),
    sec: z.string().optional(),
    bir: z.string().optional(),
    barangayBusinessPermit: z.string().min(1, {
      message: "Barangay Business Permit is required",
    }),
    givenName: z.string().min(1, { message: "Given name is required" }),
    middleName: z.string().optional(),
    familyName: z.string().min(1, { message: "Family name is required" }),
  })
  .superRefine((data, ctx) => {
    if (data.businessType === "Individual") {
      if (!data.identityType) {
        ctx.addIssue({
          code: "custom",
          path: ["identityType"],
          message: "Identity type is required for Individual business type",
        });
      }
      if (!data.identity) {
        ctx.addIssue({
          code: "custom",
          path: ["identity"],
          message: "Identity is required for Individual business type",
        });
      }
    } else if (data.businessType === "Sole-Proprietorship") {
      if (!data.dti) {
        ctx.addIssue({
          code: "custom",
          path: ["dti"],
          message: "DTI is required for Sole-Proprietorship business type",
        });
      }
    } else {
      if (!data.sec) {
        ctx.addIssue({
          code: "custom",
          path: ["sec"],
          message:
            "SEC is required for Corporation or Partnership business type",
        });
      }
    }
  });

const OnboardingComponent = ({
  categories,
}: {
  categories: Category[];
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessType: "",
      shopName: "",
      category: "",
      identityType: "",
      identity: "",
      dti: "",
      sec: "",
      bir: "",
      barangayBusinessPermit: "",
      givenName: "",
      middleName: "",
      familyName: "",
    },
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [dynamicModal, setDynamicModal] = useState(false);
  const [identityModal, setIdentityModal] = useState(false);
  const [identityContent, setIdentityContent] = useState<string>("");
  const [dtiSampleModal, setDtiSampleModal] = useState(false);
  const [birSampleModal, setBirSampleModal] = useState(false);
  const [secSampleModal, setSecSampleModal] = useState(false);
  const [barangayPermitSampleModal, setBarangayPermitSampleModal] =
    useState(false);

  const handleViewSampleIdentity = (type: string) => {
    setIdentityContent(type);
    setIdentityModal(true);
  };

  const handleCancel = () => {
    window.location.assign("/seller/account/register");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const res = await finishingSellerData(
        {
          ...values,
          identityType: values.identityType || "",
          identity: values.identity || "",
          dti: values.dti || "",
          sec: values.sec || "",
          bir: values.bir || "",
          middleName: values.middleName || "",
        },
        searchParams.get("email") || ""
      );
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.success);
        router.push(`/seller/${res.seller?.id}/dashboard`);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={cancelModal}
        onClose={() => setCancelModal(false)}
        onConfirm={handleCancel}
        title="Are you sure you want to cancel finishing your account?"
      />
      <Modal
        className="max-w-4xl"
        title="What you need to know"
        description="Here are the requirements for the business type you selected."
        onClose={() => setDynamicModal(false)}
        isOpen={dynamicModal}
      >
        {/* Map content dynamically based on the businessType */}
        {(() => {
          const businessType = form.watch(
            "businessType"
          ) as keyof typeof requirements;
          const requirements = {
            Individual: (
              <div className="space-y-5">
                <div className="flex items-start gap-2">
                  <CheckIcon className="text-green-600 w-4 h-4" />
                  <div>
                    <h3 className="font-semibold">ID Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      This involves uploading images of the front side of a
                      local ID.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="text-green-600 w-4 h-4" />
                  <div>
                    <h3 className="font-semibold">Legal Name</h3>
                    <p className="text-sm text-muted-foreground">
                      The name on your ID.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="text-green-600 w-4 h-4" />
                  <div>
                    <h3 className="font-semibold">ID number</h3>
                    <p className="text-sm text-muted-foreground">
                      The unique identification number on your ID.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="text-green-600 w-4 h-4" />
                  <div>
                    <h3 className="font-semibold">Residential address</h3>
                    <p className="text-sm text-muted-foreground">
                      The residential address on your ID.
                    </p>
                  </div>
                </div>
              </div>
            ),
            "Sole-Proprietorship": (
              <div className="space-y-5">
                <div className="flex items-start gap-2">
                  <CheckIcon className="text-green-600 w-4 h-4" />
                  <div>
                    <h3 className="font-semibold">Business verification</h3>
                    <p className="text-sm text-muted-foreground">
                      This involves uploading a certificate of business
                      document.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="text-green-600 w-4 h-4" />
                  <div>
                    <h3 className="font-semibold">Legal business name</h3>
                    <p className="text-sm text-muted-foreground">
                      This should match what was used to register with your
                      government. Ensure it&apos;s also the same as the name on
                      your bank account.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="text-green-600 w-4 h-4" />
                  <div>
                    <h3 className="font-semibold">
                      Business registration number
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      A business registration number is used to identify a
                      business entity.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="text-green-600 w-4 h-4" />
                  <div>
                    <h3 className="font-semibold">
                      Registered business address
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      The address on your business document.
                    </p>
                  </div>
                </div>
              </div>
            ),
            Corporation: (
              <div className="space-y-5">
                <div className="flex items-start gap-2">
                  <CheckIcon className="text-green-600 w-4 h-4" />
                  <div>
                    <h3 className="font-semibold">Business verification</h3>
                    <p className="text-sm text-muted-foreground">
                      This involves uploading certificate of business document.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="text-green-600 w-4 h-4" />
                  <div>
                    <h3 className="font-semibold">Legal business name</h3>
                    <p className="text-sm text-muted-foreground">
                      This should be match what was used to register with your
                      government. Make sure it&apos;s also the same as the name
                      on your bank account.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="text-green-600 w-4 h-4" />
                  <div>
                    <h3 className="font-semibold">
                      Business registration number
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      A business registration number is used to identify a
                      business entity.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="text-green-600 w-4 h-4" />
                  <div>
                    <h3 className="font-semibold">
                      Registered business address
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      The address on your business document.
                    </p>
                  </div>
                </div>
              </div>
            ),
            Partnership: (
              <div className="space-y-5">
                <div className="flex items-start gap-2">
                  <CheckIcon className="text-green-600 w-4 h-4" />
                  <div>
                    <h3 className="font-semibold">Business verification</h3>
                    <p className="text-sm text-muted-foreground">
                      This involves uploading certificate of business document.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="text-green-600 w-4 h-4" />
                  <div>
                    <h3 className="font-semibold">Legal business name</h3>
                    <p className="text-sm text-muted-foreground">
                      This should be match what was used to register with your
                      government. Make sure it&apos;s also the same as the name
                      on your bank account.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="text-green-600 w-4 h-4" />
                  <div>
                    <h3 className="font-semibold">
                      Business registration number
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      A business registration number is used to identify a
                      business entity.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="text-green-600 w-4 h-4" />
                  <div>
                    <h3 className="font-semibold">
                      Registered business address
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      The address on your business document.
                    </p>
                  </div>
                </div>
              </div>
            ),
          };

          return (
            requirements[businessType] || (
              <p className="text-muted-foreground">
                Please select a business type to view requirements.
              </p>
            )
          );
        })()}

        <Button
          type="button"
          onClick={() => setDynamicModal(false)}
          className="bg-orange-600 hover:bg-orange-600/80 mt-5 ml-auto flex"
        >
          Got it
        </Button>
      </Modal>
      <Modal
        title={""}
        description={""}
        onClose={() => setIdentityModal(false)}
        isOpen={identityModal}
      >
        <div className="relative w-full h-[30vh]">
          {identityContent === "UMID" && (
            <Image
              src={"/sample-id/umid.png"}
              alt="UMID"
              fill
              className="w-full h-full"
            />
          )}
          {identityContent === "SSS" && (
            <Image
              src={"/sample-id/sss.png"}
              alt="SSS"
              fill
              className="w-full h-full"
            />
          )}
          {identityContent === "TIN ID" && (
            <Image
              src={"/sample-id/tin.png"}
              alt="TIN ID"
              fill
              className="w-full h-full"
            />
          )}
          {identityContent === "Voter's ID" && (
            <Image
              src={"/sample-id/voters.png"}
              alt="Voter's ID"
              fill
              className="w-full h-full"
            />
          )}
          {identityContent === "Postal ID" && (
            <Image
              src={"/sample-id/postal.png"}
              alt="Postal ID"
              fill
              className="w-full h-full"
            />
          )}
        </div>
      </Modal>
      <Modal
        title={""}
        description={""}
        onClose={() => setDtiSampleModal(false)}
        isOpen={dtiSampleModal}
      >
        <div className="relative w-full h-[60vh]">
          <Image
            src={"/sample-id/dti.jpg"}
            alt="DTI"
            fill
            className="w-full h-full"
          />
        </div>
      </Modal>
      <Modal
        title={""}
        description={""}
        onClose={() => setBarangayPermitSampleModal(false)}
        isOpen={barangayPermitSampleModal}
      >
        <div className="relative w-full h-[60vh]">
          <Image
            src={"/sample-id/barangay.png"}
            alt="Barangay Business Permit"
            fill
            className="w-full h-full"
          />
        </div>
      </Modal>
      <Modal
        title={""}
        description={""}
        onClose={() => setBirSampleModal(false)}
        isOpen={birSampleModal}
      >
        <div className="relative w-full h-[60vh]">
          <Image
            src={"/sample-id/bir.jpg"}
            alt="BIR"
            fill
            className="w-full h-full"
          />
        </div>
      </Modal>
      <Modal
        title={""}
        description={""}
        onClose={() => setSecSampleModal(false)}
        isOpen={secSampleModal}
      >
        <div className="relative w-full h-[60vh]">
          <Image
            src={"/sample-id/sec.jpg"}
            alt="SEC"
            fill
            className="w-full h-full"
          />
        </div>
      </Modal>
      <Form {...form}>
        <form autoComplete='off' onSubmit={form.handleSubmit(onSubmit)}>
          <div className="bg-white shadow-sm rounded-md border mt-4 mb-4 py-6 px-5">
            <p className={`text-md text-muted-foreground font-semibold`}>
              Business Type
            </p>
            <FormField
              control={form.control}
              name="businessType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onChangeAction={field.onChange}
                    >
                      <div className="flex gap-4 flex-col mt-3">
                        <BusinessType disabled={loading} value="Individual">
                          <div>
                            <h3 className="font-semibold">Individual</h3>
                            <p className="text-sm text-muted-foreground">
                              You&apos;re selling under your own name, not as a
                              registered business.
                            </p>
                            <div
                              onClick={() => setDynamicModal(true)}
                              className="text-sm mt-2 font-semibold hover:text-black text-muted-foreground flex items-center gap-2"
                            >
                              <span>View requirements</span>
                              <ExternalLink className="w-4 h-4 mr-2 text-orange-600" />
                            </div>
                          </div>
                        </BusinessType>
                        <BusinessType
                          disabled={loading}
                          value="Sole-Proprietorship"
                        >
                          <div>
                            <h3 className="font-semibold">
                              Sole-Proprietorship
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              You own an unincorporated business by yourself.
                            </p>
                            <div
                              onClick={() => setDynamicModal(true)}
                              className="text-sm mt-2 font-semibold hover:text-black text-muted-foreground flex items-center gap-2"
                            >
                              <span>View requirements</span>
                              <ExternalLink className="w-4 h-4 mr-2 text-orange-600" />
                            </div>
                          </div>
                        </BusinessType>
                        <BusinessType disabled={loading} value="Corporation">
                          <div>
                            <h3 className="font-semibold">Corporation</h3>
                            <p className="text-sm text-muted-foreground">
                              The legal entity of your business is independent
                              from its owners.
                            </p>
                            <div
                              onClick={() => setDynamicModal(true)}
                              className="text-sm mt-2 font-semibold hover:text-black text-muted-foreground flex items-center gap-2"
                            >
                              <span>View requirements</span>
                              <ExternalLink className="w-4 h-4 mr-2 text-orange-600" />
                            </div>
                          </div>
                        </BusinessType>
                        <BusinessType disabled={loading} value="Partnership">
                          <div>
                            <h3 className="font-semibold">Partnership</h3>
                            <p className="text-sm text-muted-foreground">
                              You and one or more people run a business
                              together.
                            </p>
                            <div
                              onClick={() => setDynamicModal(true)}
                              className="text-sm mt-2 font-semibold hover:text-black text-muted-foreground flex items-center gap-2"
                            >
                              <span>View requirements</span>
                              <ExternalLink className="w-4 h-4 mr-2 text-orange-600" />
                            </div>
                          </div>
                        </BusinessType>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="text-md text-muted-foreground font-semibold mt-7">
              Shop Name
            </p>
            <p className="text-sm text-muted-foreground">
              You can just draft a name now and change it later! Please
              don&apos;t use &apos;Flagship&apos; or &apos;Official&apos; as
              part of the shop name. Please don&apos;t use only numbers or
              special characters or any foreign characters other than English
              characters.
            </p>
            <FormField
              control={form.control}
              name="shopName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="mt-2"
                      disabled={loading}
                      placeholder="Please enter a shop name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-md text-muted-foreground font-semibold mt-7">
              Select product category you sell
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Please select the product category you plan to sell. The category
              information filled in here will not affect product uploading.
            </p>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ComboBox
                      data={categories.map((item) => ({
                        value: item.slug,
                        label: item.name,
                      }))}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={loading}
                      placeholder="Select a product category"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="bg-white shadow-sm rounded-md border mt-4 mb-4 p-3 flex items-center gap-6">
            <Image
              alt="Store"
              src="/images/owner.png"
              width={100}
              height={100}
            />
            <div>
              <p className="text-lg font-semibold">
                Who&apos;s the primary shop owner?
              </p>
              <p className="text-muted-foreground">
                For compliance purposes, we may verify the primary shop owner.
                This information won&apos;t ever be shared outside of our secure
                service.
              </p>
            </div>
          </div>
          {form.watch("businessType") === "Individual" && (
            <div className="bg-white shadow-sm rounded-md border mt-4 mb-4 py-6 px-5">
              <p className="text-md text-muted-foreground font-semibold mb-2">
                Type of Identification
              </p>
              <FormField
                control={form.control}
                name="identityType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="text-muted-foreground">
                            <SelectValue placeholder="Select type of identifcation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="UMID">UMID</SelectItem>
                          <SelectItem value="SSS">SSS</SelectItem>
                          <SelectItem value="TIN ID">TIN ID</SelectItem>
                          <SelectItem value="Voter's ID">
                            Voter&apos;s ID
                          </SelectItem>
                          <SelectItem value="Postal ID">Postal ID</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-sm text-muted-foreground mt-2 flex flex-col">
                <p>
                  1. Upload images of the front side of your ID. These images
                  will be used for identity verification purposes.
                </p>
                <p>
                  2. Be sure that your images include all information on the
                  front side of your ID, including any signatures. Images also
                  need to be clear, without any warped or blurred portions.
                </p>
                <p>
                  3. Files must be less than 5 MB, and in JPG or PNG format.
                  <span
                    onClick={() =>
                      handleViewSampleIdentity(form.watch("identityType") || "")
                    }
                    className="font-semibold text-orange-600 cursor-pointer"
                  >
                    View Sample
                  </span>
                </p>
              </div>
              <FormField
                control={form.control}
                name="identity"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SingleImageUpload
                        disabled={loading}
                        className="mt-5"
                        defaultValue={field.value}
                        onSingleImageUpload={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {form.watch("businessType") === "Sole-Proprietorship" && (
            <div className="bg-white shadow-sm rounded-md border mt-4 mb-4 py-6 px-5">
              <p className="text-md text-muted-foreground font-semibold mb-2">
                Upload company registration document
              </p>
              <div className="text-sm text-muted-foreground mt-2 flex flex-col">
                <p>1. Upload your DTI Permit</p>
                <p>
                  2. Ensure that the characters on the documentation are not
                  deformed or flared.
                </p>
                <p>
                  3. The uploaded file must be less than 10 MB, and in JPG, PNG,
                  JPEG or PDF format.
                  <span
                    onClick={() => setDtiSampleModal(true)}
                    className="font-semibold text-orange-600 cursor-pointer"
                  >
                    View Sample
                  </span>
                </p>
              </div>
              <FormField
                control={form.control}
                name="dti"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SingleImageUpload
                        disabled={loading}
                        className="mt-5"
                        defaultValue={field.value}
                        onSingleImageUpload={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {form.watch("businessType") === "Corporation" && (
            <div className="bg-white shadow-sm rounded-md border mt-4 mb-4 py-6 px-5">
              <p className="text-md text-muted-foreground font-semibold mb-2">
                Upload company registration document
              </p>
              <div className="text-sm text-muted-foreground mt-2 flex flex-col">
                <p>1. Upload your SEC Registration</p>
                <p>
                  2. Ensure that the characters on the documentation are not
                  deformed or flared.
                </p>
                <p>
                  3. The uploaded file must be less than 10 MB, and in JPG, PNG,
                  JPEG or PDF format.
                  <span
                    onClick={() => setSecSampleModal(true)}
                    className="font-semibold text-orange-600 cursor-pointer"
                  >
                    View Sample
                  </span>
                </p>
              </div>
              <FormField
                control={form.control}
                name="sec"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SingleImageUpload
                        disabled={loading}
                        className="mt-5"
                        defaultValue={field.value}
                        onSingleImageUpload={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {form.watch("businessType") === "Partnership" && (
            <div className="bg-white shadow-sm rounded-md border mt-4 mb-4 py-6 px-5">
              <p className="text-md text-muted-foreground font-semibold mb-2">
                Upload company registration document
              </p>
              <div className="text-sm text-muted-foreground mt-2 flex flex-col">
                <p>1. Upload your SEC Registration</p>
                <p>
                  2. Ensure that the characters on the documentation are not
                  deformed or flared.
                </p>
                <p>
                  3. The uploaded file must be less than 10 MB, and in JPG, PNG,
                  JPEG or PDF format.
                  <span
                    onClick={() => setSecSampleModal(true)}
                    className="font-semibold text-orange-600 cursor-pointer"
                  >
                    View Sample
                  </span>
                </p>
              </div>
              <FormField
                control={form.control}
                name="sec"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SingleImageUpload
                        disabled={loading}
                        className="mt-5"
                        defaultValue={field.value}
                        onSingleImageUpload={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <div className="bg-white shadow-sm rounded-md border mt-4 mb-4 py-6 px-5">
            <p className="text-md text-muted-foreground font-semibold">
              Certificate of Registration (COR): Bureau of Internal Revenue
              (BIR) Form 2303
            </p>
            <p className="text-muted-foreground text-sm">
              All local online sellers are encouraged to be registered with the
              BIR and obtain their COR. If you already have a COR, you can
              upload it here. If not, you may leave this field blank. If you
              wish to apply for a COR, you can do so at the{" "}
              <span
                onClick={() =>
                  window.open("https://www.bir.gov.ph/newbizreg", "_blank")
                }
                className="font-semibold text-orange-600 cursor-pointer"
              >
                BIR NewBizReg website
              </span>
              .
            </p>
            <p className="text-muted-foreground text-sm mt-3">
              Note: Your COR details must match your TikTok Shop seller account
              details. Only PNG, JPG and BMP files under the 10 MB file size
              limit are supported. Please only upload your COR. By uploading
              your COR, you agree to have your COR displayed on your shop
              profile in accordance with local regulations.{" "}
              <span
                onClick={() => setBirSampleModal(true)}
                className="font-semibold text-orange-600 cursor-pointer"
              >
                View Sample
              </span>
            </p>
            <FormField
              control={form.control}
              name="bir"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SingleImageUpload
                      disabled={loading}
                      className="mt-5"
                      defaultValue={field.value}
                      onSingleImageUpload={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className="text-sm text-muted-foreground">
              This is optional.
            </span>
          </div>
          <div className="bg-white shadow-sm rounded-md border mt-4 mb-4 py-6 px-5">
            <p className="text-md text-muted-foreground font-semibold">
              Barangay Business Permit
            </p>
            <p className="text-muted-foreground text-sm">
              All local online sellers must be registered with a Barangay
              Business Permit and have their Certificate of Registration (COR).
              If you don&apos;t have a Barangay Business Permit, please visit
              out local Barangay Office to apply for one.
            </p>
            <p className="text-muted-foreground text-sm mt-3">
              Note: Your COR details must match your TikTok Shop seller account
              details. Only PNG, JPG and BMP files under the 10 MB file size
              limit are supported. Please only upload your COR. By uploading
              your COR, you agree to have your COR displayed on your shop
              profile in accordance with local regulations.{" "}
              <span
                onClick={() => setBarangayPermitSampleModal(true)}
                className="font-semibold text-orange-600 cursor-pointer"
              >
                View Sample
              </span>
            </p>
            <FormField
              control={form.control}
              name="barangayBusinessPermit"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SingleImageUpload
                      disabled={loading}
                      className="mt-5"
                      defaultValue={field.value}
                      onSingleImageUpload={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="bg-white shadow-sm rounded-md border mt-4 mb-4 py-6 px-5">
            <p className="text-md text-muted-foreground font-semibold">
              Additional contact information
            </p>
            <p className="text-sm text-muted-foreground">
              Additional contact information will be used as a back-up contact
              method. It cannot be used to log in. TikTok works hard to protect
              your data privacy.
            </p>
            <div className="flex flex-col space-y-2 mt-2">
              <Label className="text-muted-foreground mt-2">
                Email Address
              </Label>
              <Input
                value={searchParams.get("email") || ""}
                disabled
                className="mt-2"
                placeholder="Please enter your email"
              />
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-3 mt-2">
              <div className="flex flex-col space-y-2">
                <Label className="text-muted-foreground mt-2">Given Name</Label>
                <FormField
                  control={form.control}
                  name="givenName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          {...field}
                          placeholder="Given Name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label className="text-muted-foreground mt-2">
                  Middle Name
                </Label>
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          {...field}
                          placeholder="Middle Name (optional)"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label className="text-muted-foreground mt-2">
                  Family Name
                </Label>
                <FormField
                  control={form.control}
                  name="familyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          {...field}
                          placeholder="Family Name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center mt-4 justify-end gap-2">
            <Button
              type="button"
              disabled={loading}
              onClick={() => setCancelModal(true)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              type="submit"
              className="bg-orange-600 hover:bg-orange-600/80"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

const OnboardingForm = ({ categories }: { categories: Category[] }) => {
  return (
    <Suspense fallback={null}>
      <OnboardingComponent categories={categories} />
    </Suspense>
  );
};

export default OnboardingForm;
