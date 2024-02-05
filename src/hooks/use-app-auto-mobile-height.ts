import { useEffect } from "react";

export default function useAppAutoMobileHeight() {
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
}
