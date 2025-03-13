/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import MobileSearch from "./mobile-header-components/mobile-search";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { List, ShoppingCart } from "lucide-react";
import { Category } from "@prisma/client";
import axios from "axios";
import UserDropdown from "./header-components/user-dropdown";
import { BeatLoader } from "react-spinners";
import { fetchCategories } from "@/actions/categories";

const HeaderMobile = ({ user }: { user: any }) => {
  const [isNavbarVisible, setIsNavbarVisible] = React.useState(true);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const lastScrollTop = React.useRef(0);
  const [loading, setLoading] = React.useState(false);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop.current) {
        // Scrolling down
        setIsNavbarVisible(false);
      } else {
        // Scrolling up
        setIsNavbarVisible(true);
      }

      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDragScroll = (e: React.MouseEvent) => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isDragging = false;
    let startX: number;
    let scrollLeft: number;

    const startDragging = (event: MouseEvent) => {
      isDragging = true;
      slider.classList.add("cursor-grabbing");
      slider.classList.remove("cursor-grab");
      startX = event.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const stopDragging = () => {
      isDragging = false;
      slider.classList.add("cursor-grab");
      slider.classList.remove("cursor-grabbing");
    };

    const drag = (event: MouseEvent) => {
      if (!isDragging) return;
      event.preventDefault();
      const x = event.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // Adjust scroll speed
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", startDragging);
    slider.addEventListener("mouseleave", stopDragging);
    slider.addEventListener("mouseup", stopDragging);
    slider.addEventListener("mousemove", drag);

    return () => {
      slider.removeEventListener("mousedown", startDragging);
      slider.removeEventListener("mouseleave", stopDragging);
      slider.removeEventListener("mouseup", stopDragging);
      slider.removeEventListener("mousemove", drag);
    };
  };
  return (
    <nav
      id="navbar"
      className={`fixed top-0 w-full bg-white border-b transition-all py-2 px-5 z-50 duration-500 ${
        isNavbarVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex flex-col">
        {/* topbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
            </Link>
            <MobileSearch />
          </div>
          <div className="flex items-center gap-2">
            <UserDropdown auth={user} />
            <Button variant="ghost" size="icon">
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </div>
        </div>
        {/* categories bar */}
        <div
          ref={sliderRef}
          onMouseDown={handleDragScroll}
          className="flex mt-3 overflow-x-auto space-x-3 no-scrollbar cursor-grab"
          style={{userSelect: "none"}}
        >
          {loading ? (
            <BeatLoader />
          ) : (
            categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="text-sm px-4 py-2 bg-gray-100 rounded-full whitespace-nowrap hover:bg-gray-200 transition"
              >
                {category.name}
              </Link>
            ))
          )}
        </div>
      </div>
    </nav>
  );
};

export default HeaderMobile;
