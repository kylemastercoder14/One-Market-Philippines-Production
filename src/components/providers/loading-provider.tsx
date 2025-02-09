"use client";

import React, { useEffect, useState } from "react";
import Loading from "../globals/loading";

const LoadingProvider = () => {
  const [loading, setLoading] = React.useState(false);

  // Detect when the page is loading (initial load, route change, or reload)
  React.useEffect(() => {
    const handleLoad = () => {
      // After the page is fully loaded, set loading to false
      setLoading(false);
    };

    // Use the `window.onload` event to trigger after page load
    window.onload = () => {
      setTimeout(() => {
        handleLoad(); // Delay to make sure loading doesn't show immediately
      }, 200); // Optional: Add a small delay before hiding the loader
    };

    // You can also listen for the unload event to trigger loading again if needed
    // Return cleanup function
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
