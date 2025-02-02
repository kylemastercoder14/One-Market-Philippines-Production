"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";

const AddCategory = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.push("/admin/manage-categories/create")}>
      <PlusCircle />
      Add Category
    </Button>
  );
};

export default AddCategory;
