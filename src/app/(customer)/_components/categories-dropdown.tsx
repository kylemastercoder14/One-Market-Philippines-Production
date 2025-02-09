"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Category, SubCategory } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const CategoriesDropdown = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<
    string | null
  >(null);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [subLoading, setSubLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/categories");
        const fetchedCategories = response.data;

        setTimeout(() => {
          setCategories(fetchedCategories);
          setLoading(false);

          // Automatically select the first category and fetch its subcategories
          if (fetchedCategories.length > 0) {
            const firstCategorySlug = fetchedCategories[0].slug;
            setSelectedCategorySlug(firstCategorySlug);
            fetchSubCategories(firstCategorySlug);
          }
        }, 2000);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false); // Ensure loading stops even on error
      }
    };

    fetchCategories();
  }, []);

  const fetchSubCategories = async (categorySlug: string) => {
    setSubLoading(true);
    try {
      const response = await axios.get(
        `/api/categories/${categorySlug}/sub-categories`
      );
      setSubCategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    } finally {
      setSubLoading(false);
    }
  };

  const handleCategoryClick = (slug: string) => {
    setSelectedCategorySlug(slug);
    fetchSubCategories(slug);
  };
  return (
    <>
      <div
        className="relative group"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        {/* Category Button */}
        <button className="px-4 flex items-center gap-2 py-2 rounded-2xl hover:bg-zinc-300/70 text-black text-sm transition-colors duration-300">
          <span>Categories</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-300 ${
              showDropdown ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown */}
        {showDropdown && (
          <div
            className="absolute top-full -right-60 mt-2 flex w-[800px] shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-out opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            {/* Category Section */}
            <div className="w-full bg-white p-2 z-50">
              {loading ? (
                <div className="flex flex-col p-4 h-full items-center justify-center">
                  <BeatLoader />
                </div>
              ) : categories.length === 0 ? (
                <div className="flex flex-col h-full items-center justify-center">
                  <Image
                    src="/icons/empty.svg"
                    alt="No categories"
                    width={100}
                    height={100}
                  />
                  <span className="mt-2 text-sm text-gray-600">
                    No categories found
                  </span>
                </div>
              ) : (
                <div className="grid md:grid-cols-10 grid-cols-1">
                  <div className="col-span-3 overflow-y-auto max-h-[70vh] py-2 no-scrollbar border-r pr-2">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        onClick={() => handleCategoryClick(category.slug)}
                        className={`p-2 cursor-pointer hover:bg-zinc-300/70 rounded-lg flex items-center justify-between transition-colors duration-300 ${
                          selectedCategorySlug === category.slug
                            ? "bg-zinc-200"
                            : ""
                        }`}
                      >
                        <span className="text-[12px]">{category.name}</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    ))}
                  </div>
                  <div className="col-span-7 ml-3 p-2 overflow-y-auto no-scrollbar max-h-[70vh]">
                    {/* show sub-categories here based on selected category */}
                    {subLoading ? (
                      <div className="flex flex-col h-full items-center justify-center">
                        <BeatLoader />
                      </div>
                    ) : subCategories.length === 0 ? (
                      <div className="flex flex-col h-full items-center justify-center">
                        <Image
                          src="/icons/empty.svg"
                          alt="No subcategories"
                          width={100}
                          height={100}
                        />
                        <span className="mt-2 text-sm text-gray-600">
                          No subcategories found
                        </span>
                      </div>
                    ) : (
                      <ul className="grid md:grid-cols-4 grid-cols-1 gap-5">
                        {subCategories.map((subCategory) => (
                          <li
                            key={subCategory.id}
                            onClick={() =>
                              router.push(
                                `/products/${subCategory.categorySlug}/sub-category/${subCategory.slug}`
                              )
                            }
                            className="p-2 flex text-white bg-gradient-to-b h-[120px] from-red-400 via-red-700 to-red-800 rounded-xl flex-col items-center justify-center cursor-pointer"
                          >
                            <span className="text-sm text-center mt-2">
                              {subCategory.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoriesDropdown;
