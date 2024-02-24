"use client";

import { useEffect } from "react";

export default function ScrollToHash() {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const hTagId = decodeURI(hash.slice(1));
      const h = document.getElementById(hTagId);
      if (!h) {
        console.error("Element with id '" + hTagId + "' not found.");
        return null;
      }
      const rect = h.getBoundingClientRect();
      const height = rect.top + window.scrollY - 70;

      window.scrollTo({
        top: height,
        behavior: "smooth",
      });
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return null;
}
