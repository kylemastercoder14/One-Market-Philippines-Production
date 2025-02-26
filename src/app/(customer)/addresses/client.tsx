"use client";

import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Lock, Plus } from "lucide-react";
import { Address } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { deleteAddress, setDefaultAddress } from "@/actions/user";
import AlertModal from "@/components/ui/alert-modal";

const links = [
  {
    title: "Your orders",
    icon: "📦",
    href: "/order-history",
  },
  {
    title: "Your reviews",
    icon: "📝",
    href: "/reviews",
  },
  {
    title: "Your profile",
    icon: "👤",
    href: "/profile",
  },
  {
    title: "Coupons & offers",
    icon: "💰",
    href: "/coupons",
  },
  {
    title: "Followed stores",
    icon: "🏪",
    href: "/stores",
  },
  {
    title: "Browsing history",
    icon: "🔍",
    href: "/history",
  },
  {
    title: "Addresses",
    icon: "🏠",
    href: "/addresses",
  },
  {
    title: "Account security",
    icon: "🔒",
    href: "/security",
  },
  {
    title: "Notifications",
    icon: "🔔",
    href: "/notifications",
  },
];

const AddressClient = ({ data }: { data: Address[] }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [addresses, setAddresses] = useState(
    [...data].sort((a, b) => (b.isDefault ? 1 : -1))
  );
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addressId, setAddressId] = useState("");

  const onCopy = (
    name: string,
    contactNumber: string,
    street: string,
    homeAddress: string
  ) => {
    navigator.clipboard.writeText(
      `${name} ${contactNumber}\n${street}\n${homeAddress}`
    );
    toast.success("Address copied to clipboard");
  };

  const toggleDefaultAddress = async (addressId: string) => {
    setLoading(true);
    toast.loading("Setting default address...");
    try {
      const res = await setDefaultAddress(addressId);

      if (res.success) {
        // Optimistically update UI
        setAddresses((prevAddresses) =>
          prevAddresses
            .map((addr) =>
              addr.id === addressId
                ? { ...addr, isDefault: true }
                : { ...addr, isDefault: false }
            )
            .sort((a, b) => (b.isDefault ? 1 : -1))
        );

        toast.success(res.success);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  };

  const onDelete = async (addressId: string) => {
    setLoading(true);
    toast.loading("Deleting address...");
    try {
      const res = await deleteAddress(addressId);

      if (res.success) {
        // Optimistically update UI
        setAddresses((prevAddresses) =>
          prevAddresses.filter((addr) => addr.id !== addressId)
        );

        toast.success(res.success);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  };

  return (
    <>
      <AlertModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={() => onDelete(addressId)}
      />
      <div className="md:px-[200px] px-10 pb-20 pt-24">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Addresses</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="grid md:grid-cols-10 grid-cols-1 gap-5 mt-5">
          <div className="col-span-2 space-y-3">
            {links.map((link) => (
              <Link
                key={link.href}
                className={`text-base ${pathname === link.href ? "border-l-[3px] bg-orange-400/10 border-red-800" : ""} hover:bg-red-200 p-2 flex items-center gap-2 cursor-pointer`}
                href={link.href}
              >
                <span className="text-base">{link.icon}</span>
                <span>{link.title}</span>
              </Link>
            ))}
          </div>
          <div className="col-span-8">
            <Link
              className="text-red-800 flex items-center gap-2 hover:underline md:w-[200px]"
              href="/addresses/new-address"
            >
              <Plus className="size-5" />
              Add a new address
            </Link>
            <div className="py-2 text-green-700 rounded-md flex items-center mt-2 gap-3">
              <Lock className="w-4 h-4" />
              <p className="text-xs">
                All data will be encrypted and securely transmitted.
              </p>
            </div>
            {addresses.length === 0 ? (
              <div className="bg-gray-100 p-5 rounded-md mt-3">
                <p className="text-gray-600">You have no addresses saved.</p>
              </div>
            ) : (
              <div className="mt-5 max-w-3xl space-y-5">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="border shadow-sm p-4 rounded-md"
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <h1 className="font-semibold">
                        {address.firstName} {address.lastName}
                      </h1>
                      <span>
                        {address.contactNumber.replace(
                          /^(\+63)(\d{3})(\d{3})(\d{4})$/,
                          "$1 $2 $3 $4"
                        )}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{address.homeAddress}</p>
                    <p className="text-sm mt-1">
                      {address.barangay}, {address.city}, {address.province},{" "}
                      {address.region} - {address.zipCode}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          disabled={loading}
                          id={`isDefault-${address.id}`}
                          checked={address.isDefault}
                          onCheckedChange={() =>
                            toggleDefaultAddress(address.id)
                          }
                        />
                        <label
                          htmlFor="isDefaultAddress"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {address.isDefault
                            ? "Default address"
                            : "Set as default"}
                        </label>
                      </div>
                      <div className="flex text-sm text-muted-foreground items-center gap-2">
                        <p
                          onClick={() => {
                            setAddressId(address.id);
                            setDeleteModal(true);
                          }}
                          className="cursor-pointer hover:text-red-800"
                        >
                          Delete
                        </p>
                        <p className="text-zinc-300">|</p>
                        <p
                          onClick={() =>
                            onCopy(
                              address.firstName + " " + address.lastName,
                              `${address.contactNumber.replace(
                                /^(\+63)(\d{3})(\d{3})(\d{4})$/,
                                "$1 $2 $3 $4"
                              )}`,
                              address.homeAddress,
                              `${address.barangay}, ${address.city}, ${address.province}, ${address.region} - ${address.zipCode}`
                            )
                          }
                          className="cursor-pointer hover:text-red-800"
                        >
                          Copy
                        </p>

                        <p className="text-zinc-300">|</p>
                        <Link
                          className="hover:text-red-800"
                          href={`/addresses/${address.id}`}
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressClient;
