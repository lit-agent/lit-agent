"use client";

import { useEffect } from "react";

export const AutoMobileHeight = () => {
  /**
   * set height for mobile browser (safari, chrome ...) to be full of inner height (but invalid !)
   */
  useEffect(() => {
    const setInnerHeight = () => {
      console.log("add setInnerHeight");
      document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`,
      );
    };
    window.addEventListener("resize", setInnerHeight);

    setInnerHeight();
    return () => {
      console.log("remove setInnerHeight");
      window.removeEventListener("resize", setInnerHeight);
    };
  }, []);

  return null;
};
