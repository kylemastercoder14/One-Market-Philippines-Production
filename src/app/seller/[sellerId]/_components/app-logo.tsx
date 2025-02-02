"use client";

import * as React from "react";
import Image from "next/image";

export function AppLogo() {
  return (
    <div className="flex items-center gap-3 px-2 py-3">
      <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
      <div>
        <p className="font-semibold text-sm">1 Market Philippines</p>
        <p className="text-xs text-muted-foreground">Seller Hub</p>
      </div>
    </div>
  );
}
