/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
"use client";

import { useState, useEffect } from "react";
import {
  BriefcaseBusiness,
  Building,
  Camera,
  CoffeeIcon,
  GlassesIcon,
  HammerIcon,
  LaptopIcon,
  Loader2,
  ShirtIcon,
  UtensilsCrossed,
} from "lucide-react";
import React from "react";

const LoadingComponent = () => {
  const icons = [
    <ShirtIcon className="w-6 h-6 text-gray-600" />,
    <BriefcaseBusiness className="w-6 h-6 text-gray-600" />,
    <UtensilsCrossed className="w-6 h-6 text-gray-600" />,
    <CoffeeIcon className="w-6 h-6 text-gray-600" />,
    <LaptopIcon className="w-6 h-6 text-gray-600" />,
    <Building className="w-6 h-6 text-gray-600" />,
    <Camera className="w-6 h-6 text-gray-600" />,
    <GlassesIcon className="w-6 h-6 text-gray-600" />,
    <HammerIcon className="w-6 h-6 text-gray-600" />,
  ];

  const [currentIcon, setCurrentIcon] = useState(icons[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * icons.length);
      setCurrentIcon(icons[randomIndex]);
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full h-full fixed inset-0 z-[99] flex items-center flex-col justify-center backdrop-blur bg-black bg-opacity-50">
      <div className="bg-white w-32 h-32 gap-3 rounded-xl flex items-center flex-col justify-center">
        {currentIcon}
        <span className="text-base flex items-center gap-2 text-gray-600">
          Loading... <Loader2 className="w-4 h-4 animate-spin" />
        </span>
      </div>
    </div>
  );
};

export default LoadingComponent;
