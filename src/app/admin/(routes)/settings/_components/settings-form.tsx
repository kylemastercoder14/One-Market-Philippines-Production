/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { AdminSettings } from "@prisma/client";
import React from "react";
import Image from "next/image";
import { Edit } from "lucide-react";
import BrandNameForm from "./brand-name-form";
import AddressForm from "./address-form";
import DescriptionForm from "./description-form";
import CommisionForm from "./commision-form";
import DateEstablishedForm from "./date-established-form";
import ContactNumberForm from "./contact-number-form";
import SingleImageUpload from "@/components/globals/single-image-upload";
import { toast } from "sonner";
import { createLogo, updateLogo } from "@/actions/admin";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const SettingsForm = ({ data }: { data: AdminSettings[] }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);
  const toggleEdit = () => setIsEditing((prev) => !prev);
  const [image, setImage] = React.useState<string | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);

  const adminData = data[0] || {};

  const handleImageUpload = async () => {
    setLoading(true);
    try {
      if (image) {
        if (!adminData.id) {
          await createLogo(image);
        } else {
          await updateLogo(image, adminData.id);
        }
      } else {
        toast.error("No image selected");
      }
      setIsEditing(false);
      toast.success("Logo uploaded successfully");
      router.refresh();
    } catch (error) {
      toast.error("Error saving logo to the database");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <div className="flex items-center gap-3">
        <div className="relative w-24 h-24">
          {adminData.logo ? (
            <Image
              src={adminData.logo}
              alt="Logo"
              fill
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <div className="w-full h-full rounded-md bg-gradient-to-r from-zinc-400 to-zinc-600 flex items-center justify-center text-white">
              LOGO
            </div>
          )}
          <div
            onClick={toggleEdit}
            className="absolute -right-2 -bottom-2 w-6 h-6 flex items-center justify-center cursor-pointer rounded-full bg-gradient-to-r from-orange-500 to-orange-700 z-20"
          >
            <Edit className="w-3 h-3 text-white" />
          </div>
        </div>
        <div>
          <h4 className="font-semibold">
            {adminData.brandName || "No Brand Name"}
          </h4>
          <p className="text-gray-500">{adminData.address || "No Address"}</p>
        </div>
      </div>

      {isEditing && (
        <div className="mt-5">
          <form
            className="flex items-center gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              handleImageUpload();
            }}
          >
            <SingleImageUpload
              defaultValue={image}
              onSingleImageUpload={(url) => setImage(url)}
            />
            <Button size="sm" disabled={loading} type="submit">
              Upload Image
            </Button>
            <Button
              size="sm"
              disabled={loading}
              variant="ghost"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        <div>
          <BrandNameForm
            settingsId={adminData.id}
            brandName={adminData.brandName}
          />
          <AddressForm settingsId={adminData.id} address={adminData.address} />
          <DescriptionForm
            settingsId={adminData.id}
            description={adminData.description}
          />
        </div>
        <div>
          <CommisionForm
            settingsId={adminData.id}
            commision={adminData.commision}
          />
          <DateEstablishedForm
            settingsId={adminData.id}
            dateEstablished={adminData.dateEstablished}
          />
          <ContactNumberForm
            settingsId={adminData.id}
            contactNumber={adminData.contactNumber}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsForm;
