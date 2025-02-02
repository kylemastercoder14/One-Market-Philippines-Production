"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const HeadingAction = ({
  title,
  link,
  className,
}: {
  title: string;
  link: string;
  className?: string;
}) => {
  return (
    <Link href={link} className={`flex items-center gap-2 ${className}`}>
      <ArrowLeft className="w-4 h-4 mr-2" />
      <span className="font-semibold text-xl">{title}</span>
    </Link>
  );
};

export default HeadingAction;
