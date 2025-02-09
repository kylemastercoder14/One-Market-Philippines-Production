"use client";

import React, { useEffect, useState } from "react";
import Loading from "@/components/globals/loading";

const LoadingProvider = () => {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    window.onload = () => {
      setTimeout(() => {
        handleLoad();
      }, 200);
    };

    return () => {
      window.onload = null;
    };
  }, []);
  return (
    <>
      <Loading loading={loading} />
    </>
  );
};

export default LoadingProvider;
