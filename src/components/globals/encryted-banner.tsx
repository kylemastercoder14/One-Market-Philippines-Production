import { Lock } from "lucide-react";
import React from "react";

const EncryptedBanner = () => {
  return (
    <div className="text-center py-2 text-green-700 rounded-md flex items-center justify-center mt-2 gap-3">
      <Lock className="w-4 h-4" />
      <p className="text-xs">
        All data will be encrypted and securely transmitted.
      </p>
    </div>
  );
};

export default EncryptedBanner;
