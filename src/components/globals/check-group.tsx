"use client";

import React, { createContext, useContext } from "react";

// Define the context value type
interface CheckContextValue {
  value: string[];
  onChange: (value: string) => void;
}

// Create a context with a default value
const CheckContext = createContext<CheckContextValue | null>(null);

// OptionCheck Component
const OptionCheck = ({
  children,
  disabled,
  value,
  ...props
}: {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
}) => {
  const context = useContext(CheckContext);

  if (!context) {
    throw new Error("OptionCheck must be used within a CheckGroup");
  }

  const { value: selectedValues, onChange } = context;

  const isChecked = selectedValues.includes(value);

  return (
    <label
      className={`px-6 py-4 flex items-start gap-3 shadow border rounded-lg cursor-pointer transition-all ${
        isChecked ? "border-[#8D021F] dark:border-[#fa5075]" : "border-gray-300"
      }`}
    >
      <input
        type="checkbox"
        className="hidden"
        disabled={disabled}
        {...props}
        value={value}
        checked={isChecked}
        onChange={() => onChange(value)} // Trigger context's onChange
      />
      <div
        className={`w-3 h-3 mt-1 rounded-full border-2 flex items-center justify-center ${
          isChecked ? "border-[#8D021F] dark:border-[#fa5075]" : "border-gray-300"
        }`}
      >
        {isChecked && (
          <div className="w-1 h-1 rounded-full dark:bg-[#fa5075] bg-[#8D021F]"></div>
        )}
      </div>
      {children}
    </label>
  );
};

// CheckGroup Component
export function CheckGroup({
  value,
  onChangeAction,
  children,
}: {
  value: string[];
  onChangeAction: (value: string[]) => void;
  children: React.ReactNode;
}) {
  const handleChange = (selectedValue: string) => {
    const newValues = value.includes(selectedValue)
      ? value.filter((v) => v !== selectedValue) // Remove if already selected
      : [...value, selectedValue]; // Add if not selected

    onChangeAction(newValues);
  };

  return (
    <CheckContext.Provider value={{ value, onChange: handleChange }}>
      {children}
    </CheckContext.Provider>
  );
}

export default OptionCheck;
