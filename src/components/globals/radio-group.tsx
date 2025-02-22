"use client";

import React, { createContext, useContext } from "react";

// Define the context value type
interface RadioContextValue {
  value: string;
  onChange: (value: string) => void;
}

// Create a context with a default value
const RadioContext = createContext<RadioContextValue | null>(null);

// OptionRadio Component
const OptionRadio = ({
  children,
  disabled,
  value,
  className,
  radioShow = true,
  ...props
}: {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
  className?: string;
  radioShow?: boolean;
}) => {
  const context = useContext(RadioContext);

  if (!context) {
    throw new Error("OptionRadio must be used within a RadioGroup");
  }

  const { value: selectedValue, onChange } = context;

  return (
    <label
      className={`${className} flex items-start gap-3 shadow border rounded-lg cursor-pointer transition-all ${
        selectedValue === value
          ? "border-[#8D021F] dark:border-[#fa5075]"
          : "border-gray-300"
      }`}
    >
      <input
        type="radio"
        className="hidden"
        disabled={disabled}
        {...props}
        value={value}
        checked={selectedValue === value}
        onChange={() => onChange(value)} // Trigger context's onChange
      />
      {radioShow && (
        <div
          className={`w-3 h-3 mt-1 rounded-full border-2 flex items-center justify-center ${
            selectedValue === value
              ? "border-[#8D021F] dark:border-[#fa5075]"
              : "border-gray-300"
          }`}
        >
          {selectedValue === value && (
            <div className="w-1 h-1 rounded-full dark:bg-[#fa5075] bg-[#8D021F]"></div>
          )}
        </div>
      )}
      {children}
    </label>
  );
};

// RadioGroup Component
export function RadioGroup({
  value,
  onChangeAction,
  children,
}: {
  value: string;
  onChangeAction: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <RadioContext.Provider value={{ value, onChange: onChangeAction }}>
      {children}
    </RadioContext.Provider>
  );
}

export default OptionRadio;
