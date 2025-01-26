import { CheckCircle } from "lucide-react";
import React from "react";

const FormSuccess = ({ message }: { message: string }) => {
  return (
    <div className="bg-green-600/30 mt-3 px-4 flex justify-center items-center gap-3 py-2 rounded-md">
      <CheckCircle className="w-5 text-green-600 h-5" />
      <p className="text-green-600 text-sm">{message}</p>
    </div>
  );
};

export default FormSuccess;
