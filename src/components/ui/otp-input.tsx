import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import OtpInput, { OTPInputProps } from "react-otp-input";

type OtpOptions = Omit<OTPInputProps, "renderInput">;

type OtpStyledInputProps = {
  className?: string;
  disabled?: boolean;
} & OtpOptions;

/**
 * Otp input Docs: {@link: https://shadcn-extension.vercel.app/docs/otp-input}
 */

export const OtpStyledInput = ({
  className,
  disabled,
  ...props
}: OtpStyledInputProps) => {
  return (
    <OtpInput
      {...props}
      renderInput={(inputProps) => (
        <Input
          {...inputProps}
          disabled={disabled}
          className={cn("!w-16 !h-14 rounded-md !appearance-none selection:bg-none ", className)}
        />
      )}
      containerStyle={`flex justify-center items-center flex-wrap  text-2xl font-bold ${
        props.renderSeparator ? "gap-1" : "gap-x-3 gap-y-2"
      }`}
    />
  );
};
