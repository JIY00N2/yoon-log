"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToHash() {
  const router = useRouter();

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const targetWindow = e.target as Window;
      const url = targetWindow.location.href;
      router.push(url, { scroll: false });
    };

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

      window.scrollTo({ top: height });
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  return null;
}
