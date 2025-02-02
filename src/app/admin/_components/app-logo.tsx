"use client";

import * as React from "react";
import Image from "next/image";
import { viewAllSettingsData } from "@/actions/admin";
import { Loader2 } from "lucide-react";

export function AppLogo() {
  const [data, setData] = React.useState<
    {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      contactNumber: string | null;
      description: string | null;
      logo: string | null;
      brandName: string | null;
      commision: number | null;
      dateEstablished: string | null;
      address: string | null;
    }[]
  >([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await viewAllSettingsData();
        setData(response || []); // Ensure `response` is set to an array even if it's null/undefined.
      } catch (error) {
        console.error("Failed to fetch settings data:", error);
      }
    };

    fetchData();
  }, []);

  const logoSrc = data[0]?.logo || "/images/logo.png"; // Provide a fallback image path.
  const brandName = data[0]?.brandName || (
    <Loader2 className="w-4 h-4 animate-spin text-center" />
  );

  console.log("Logo URL:", logoSrc);

  return (
    <div className="flex items-center gap-3 px-2 py-3">
      <Image src={logoSrc} alt="Logo" width={50} height={50} />
      <div>
        <p className="font-semibold text-sm">{brandName}</p>
        <p className="text-xs text-muted-foreground">Admin Dashboard</p>
      </div>
    </div>
  );
}
