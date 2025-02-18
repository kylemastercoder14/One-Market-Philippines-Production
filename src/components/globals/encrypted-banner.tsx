import React from "react";
import { LockClosedIcon } from "@heroicons/react/24/solid";

const EncryptedBanner = () => {
  return (
    <div className="text-[#0A8800] flex items-center gap-3">
      <LockClosedIcon className="w-5 h-5" />
      <span className="text-sm font-semibold">All data is encrypted</span>
    </div>
  );
};

export default EncryptedBanner;
