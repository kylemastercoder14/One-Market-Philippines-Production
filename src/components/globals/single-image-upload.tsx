"use client";

import { uploadToS3 } from "@/lib/s3";
import { X, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SingleImageUpload = ({
  onSingleImageUpload,
  className,
  defaultValue = "",
  disabled,
}: {
  onSingleImageUpload: (url: string) => void;
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
}) => {
  const [imageUrl, setImageUrl] = useState<string>(defaultValue);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setImageUrl(defaultValue);
    return () => {
      if (imageUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [defaultValue, imageUrl]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file || uploading) return;

      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB.");
        return;
      }

      setUploading(true);
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);

      try {
        const { url } = await uploadToS3(file);
        toast.success("Upload successful!");
        setImageUrl(url);
        onSingleImageUpload(url);
      } catch {
        toast.error("Upload failed.");
        setImageUrl("");
      } finally {
        setUploading(false);
      }
    },
  });

  return (
    <div className={cn("grid gap-3", className)}>
      {imageUrl ? (
        <div className="relative w-32 h-[120px] rounded-md overflow-hidden border">
          <Image
            src={imageUrl}
            alt="Uploaded image"
            fill
            className="object-cover"
          />
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setImageUrl("")}
            disabled={disabled}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps({
            className: cn(
              "w-32 h-[120px] border-2 rounded-md flex items-center justify-center",
              disabled ? "opacity-50 pointer-events-none" : "cursor-pointer"
            ),
          })}
        >
          <input {...getInputProps()} />
          <Plus className="w-5 h-5" />
          <p className="text-sm mt-1">Add Photo</p>
        </div>
      )}
    </div>
  );
};

export default SingleImageUpload;
