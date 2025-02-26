"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useAddressData } from "@/lib/address-selection";
import { Label } from "@/components/ui/label";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import ComboBox from "@/components/ui/combo-box";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { createAddress } from '@/actions/user';

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

const NewAddress = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [isDefaultAddress, setIsDefaultAddress] = React.useState(true);
  const [selectedRegionName, setSelectedRegionName] = React.useState("");
  const [selectedProvinceName, setSelectedProvinceName] = React.useState("");
  const [selectedMunicipalityName, setSelectedMunicipalityName] =
    React.useState("");
  const [selectedBarangayName, setSelectedBarangayName] = React.useState("");
  const {
    regionOptions,
    provinceOptions,
    municipalityOptions,
    barangayOptions,
  } = useAddressData(
    selectedRegionName,
    selectedProvinceName,
    selectedMunicipalityName
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newAddressData = {
        firstName,
        lastName,
        address,
        postalCode,
        phoneNumber,
        isDefaultAddress,
        region: selectedRegionName,
        province: selectedProvinceName,
        municipality: selectedMunicipalityName,
        barangay: selectedBarangayName,
      };
      if (
        !newAddressData.firstName ||
        !newAddressData.lastName ||
        !newAddressData.address ||
        !newAddressData.postalCode ||
        !newAddressData.phoneNumber ||
        !newAddressData.region ||
        !newAddressData.province ||
        !newAddressData.municipality ||
        !newAddressData.barangay
      ) {
        toast.error("Please fill out all required fields.");
        return;
      }

      const res = await createAddress(newAddressData);

      if (res.success) {
        toast.success(res.success);
        router.push("/addresses");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:px-[200px] px-10 pb-20 pt-24">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/addresses">Addresses</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Add a new address</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid md:grid-cols-10 grid-cols-1 gap-5 mt-5">
        <div className="col-span-2 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              className={`text-base ${pathname === link.href || pathname.includes(link.href) ? "border-l-[3px] bg-orange-400/10 border-orange-600" : ""} hover:bg-orange-100 p-2 flex items-center gap-2 cursor-pointer`}
              href={link.href}
            >
              <span className="text-base">{link.icon}</span>
              <span>{link.title}</span>
            </Link>
          ))}
        </div>
        <div className="col-span-8">
          <h1 className="font-medium text-lg">Add a new address</h1>
          <div className="py-2 text-green-700 rounded-md flex items-center mt-1 gap-3">
            <Lock className="w-4 h-4" />
            <p className="text-xs">
              All data will be encrypted and securely transmitted.
            </p>
          </div>
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col"
          >
            <div className="max-w-2xl space-y-4">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                <div className="space-y-1">
                  <Label>
                    First Name <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    disabled={loading}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>
                    Last Name <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    disabled={loading}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label>
                  Phone Number <span className="text-red-600">*</span>
                </Label>
                <PhoneInput
                  className={`flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                  placeholder="Enter the phone number"
                  defaultCountry="PH"
                  countries={["PH"]}
                  international
                  countryCallingCodeEditable={false}
                  withCountryCallingCode
                  limitMaxLength={true}
                  value={phoneNumber}
                  onChange={(value) => setPhoneNumber(value ?? "")}
                  numberInputProps={{
                    className: `rounded-md px-4 focus:outline-none bg-transparent h-full w-full !bg-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed`,
                  }}
                  maxLength={16}
                  disabled={loading}
                />
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                <div className="space-y-1">
                  <Label>
                    Region <span className="text-red-600">*</span>
                  </Label>
                  <ComboBox
                    className="w-full"
                    data={regionOptions.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                    value={selectedRegionName}
                    onChange={(value) => setSelectedRegionName(value)}
                    disabled={loading}
                    placeholder="Select a region"
                  />
                </div>
                <div className="space-y-1">
                  <Label>
                    Province <span className="text-red-600">*</span>
                  </Label>
                  <ComboBox
                    className="w-full"
                    data={provinceOptions.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                    value={selectedProvinceName}
                    onChange={(value) => setSelectedProvinceName(value)}
                    disabled={loading}
                    placeholder="Select a province"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                <div className="space-y-1">
                  <Label>
                    Munipality <span className="text-red-600">*</span>
                  </Label>
                  <ComboBox
                    className="w-full"
                    data={municipalityOptions.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                    value={selectedMunicipalityName}
                    onChange={(value) => setSelectedMunicipalityName(value)}
                    disabled={loading}
                    placeholder="Select a municipality"
                  />
                </div>
                <div className="space-y-1">
                  <Label>
                    Barangay <span className="text-red-600">*</span>
                  </Label>
                  <ComboBox
                    className="w-full"
                    data={barangayOptions.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                    value={selectedBarangayName}
                    onChange={(value) => setSelectedBarangayName(value)}
                    disabled={loading}
                    placeholder="Select a barangay"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-5 grid-cols-1 gap-2">
                <div className="space-y-1 md:col-span-4">
                  <Label>
                    Apartment, Unit, Building, Floor, Room{" "}
                    <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    disabled={loading}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Apartment, Unit, Building, Floor, Room"
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-1 md:col-span-1">
                  <Label>
                    Zip Code <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    disabled={loading}
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Zip Code"
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isDefault"
                  checked={isDefaultAddress}
                  onCheckedChange={(value) =>
                    setIsDefaultAddress(value === true)
                  }
                />
                <label
                  htmlFor="isDefault"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Set as my default address
                </label>
              </div>
            </div>
            <div className="flex mt-5 items-center">
              <Button type='button' onClick={() => router.push("/addresses")} variant="ghost">
                Cancel
              </Button>
              <Button disabled={loading}>
                {loading && <Loader2 className="size-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewAddress;
