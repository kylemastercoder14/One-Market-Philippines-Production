/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import SearchContainer from "./header-components/search-container";
import UserDropdown from "./header-components/user-dropdown";
import SupportDropdown from "./support-dropdown";
import CategoriesDropdown from "./categories-dropdown";
import HeaderMobile from "./header-mobild";
import useCart from '@/hooks/use-cart';

const Header = ({ user }: { user: any }) => {
  const { items } = useCart();
  const pathname = usePathname();
  const [isNavbarVisible, setIsNavbarVisible] = React.useState(true);
  const lastScrollTop = React.useRef(0);
  const [isMobile, setIsMobile] = React.useState(false);

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

  React.useEffect(() => {
    const checkIfMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <>
      {isMobile && <HeaderMobile user={user} />}
      {!isMobile && (
        <nav
          id="navbar"
          className={`fixed top-0 w-full h-[80px] bg-white border-b transition-all py-0 md:px-[200px] px-10 z-50 flex justify-between items-center duration-500 ${
            isNavbarVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex items-center gap-5">
            <Link href="/">
              <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
            </Link>
            <ul className="flex">
              <li>
                <Link
                  className={`px-4 flex items-center gap-2 py-2 rounded-2xl hover:bg-zinc-300/70 text-black text-sm transition-colors duration-300 ${pathname === "/best-sellers" ? "bg-zinc-300/70 border-b-2 border-zinc-600" : ""}`}
                  href="/best-sellers"
                >
                  <Image
                    className="md:block hidden"
                    width={15}
                    height={15}
                    src="/icons/like.svg"
                    alt="Like"
                  />
                  <span>Best Sellers</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`px-4 flex items-center gap-2 py-2 rounded-2xl hover:bg-zinc-300/70 text-black text-sm transition-colors duration-300 ${pathname === "/top-rated" ? "bg-zinc-300/70 border-b-2 border-zinc-600" : ""}`}
                  href="/top-rated"
                >
                  <Image
                    className="md:block hidden"
                    width={15}
                    height={15}
                    src="/icons/top.svg"
                    alt="Like"
                  />
                  <span>Top Rated Products</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`px-4 flex items-center gap-2 py-2 rounded-2xl hover:bg-zinc-300/70 text-black text-sm transition-colors duration-300 ${pathname === "/new-arrivals" ? "bg-zinc-300/70 border-b-2 border-zinc-600" : ""}`}
                  href="/new-arrivals"
                >
                  New Arrivals
                </Link>
              </li>
              <CategoriesDropdown />
            </ul>
          </div>
          <div className="flex items-center">
            <SearchContainer />
            <UserDropdown auth={user} />
            <SupportDropdown />
            <Link
              href="/shopping-cart"
              className="px-4 flex items-center gap-2 py-2 rounded-2xl hover:bg-zinc-300/70 text-black text-sm transition-colors relative duration-300"
            >
              <span className="text-xs bg-zinc-600 w-4 h-4 flex items-center rounded-full justify-center absolute text-white top-0 right-0">
                {items.length}
              </span>
              <ShoppingCart className="w-4 h-4" />
            </Link>
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;
