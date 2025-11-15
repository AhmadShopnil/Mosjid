"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AosWrapper({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });

    // Fixes AOS not triggering after hydration
    setTimeout(() => {
      AOS.refresh();
    }, 200);
  }, []);

  return <>{children}</>;
}
