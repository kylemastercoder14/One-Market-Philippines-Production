/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";

const LanguageDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <div
        className="relative group"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        {/* User Avatar and Button */}
        <button className="px-4 flex items-center gap-2 py-2 rounded-2xl hover:bg-zinc-300/70 text-black text-sm transition-colors duration-300">
          <img
            src="/icons/flag.webp"
            alt="User Avatar"
            className="w-5 h-5 rounded-full"
          />
          <span>EN</span>
        </button>

        {/* Dropdown */}
        {showDropdown && (
          <div
            className="absolute top-full right-0 mt-2 flex w-[200px] shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-out opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            {/* Profile Section */}
            <div className="w-full bg-white p-2 z-50">
				<p className='mx-3 pt-2 font-semibold'>Language</p>
              <ul className="p-2 space-y-2">
                {[
                  "English-EN",
                  "Filipino-FIL",
                ].map((option, index) => (
                  <li
                    key={index}
                    className="text-sm hover:bg-zinc-100 p-2 rounded-md cursor-pointer"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LanguageDropdown;
