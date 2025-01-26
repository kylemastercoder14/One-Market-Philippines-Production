import { TriangleAlert } from "lucide-react";
import React from "react";

const FormError = ({ message }: { message: string }) => {
  return (
    <div className="bg-red-600/30 mt-3 px-4 flex justify-center items-center gap-3 py-2 rounded-md">
      <TriangleAlert className="w-5 text-red-600 h-5" />
      <p className="text-red-600 text-sm">{message}</p>
    </div>
  );
};

export default FormError;
