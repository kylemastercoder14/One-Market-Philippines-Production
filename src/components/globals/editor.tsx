"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

import React, { useMemo } from "react";

const Editor = ({
  value,
  onChange,
  disabled
}: {
  onChange: (value: string) => void;
  value: string;
  disabled?: boolean;
}) => {
  const ReactQuill = useMemo(
	() => dynamic(() => import("react-quill-new"), { ssr: false }),
	[]
  );
  return (
	<div className={`bg-white dark:bg-zinc-900 ${disabled ? "text-muted-foreground cursor-not-allowed pointer-events-none" : ""}`}>
	  <ReactQuill placeholder='Please enter the text here...' theme="snow" value={value} onChange={onChange} />
	</div>
  );
};

export default Editor;
