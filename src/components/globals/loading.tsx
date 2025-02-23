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
    <ShirtIcon className="w-6 h-6 text-white" />,
    <BriefcaseBusiness className="w-6 h-6 text-white" />,
    <UtensilsCrossed className="w-6 h-6 text-white" />,
    <CoffeeIcon className="w-6 h-6 text-white" />,
    <LaptopIcon className="w-6 h-6 text-white" />,
    <Building className="w-6 h-6 text-white" />,
    <Camera className="w-6 h-6 text-white" />,
    <GlassesIcon className="w-6 h-6 text-white" />,
    <HammerIcon className="w-6 h-6 text-white" />,
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
    <div className="w-full h-full fixed inset-0 z-[99] flex items-center flex-col justify-center bg-white">
      <div className="bg-[#8D021F] shadow-lg w-32 h-32 gap-3 rounded-xl flex items-center flex-col justify-center">
        {currentIcon}
        <span className="text-base flex items-center gap-2 text-white">
          Loading... <Loader2 className="w-4 h-4 animate-spin" />
        </span>
      </div>
    </div>
  );
};

export default LoadingComponent;
