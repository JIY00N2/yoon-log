"use client";

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type ThemeContextState = {
  isDarkMode: boolean;
  toggleDarkMode: VoidFunction;
};

export const ThemeContext = createContext<ThemeContextState | null>(null);

const key = "theme";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const theme = localStorage.getItem(key);
    if (!theme) {
      localStorage.setItem(key, "light");
    } else {
      setIsDarkMode(theme === "dark");
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((isDark) => {
      localStorage.setItem("theme", isDark ? "light" : "dark");
      document.documentElement.setAttribute(
        "data-theme",
        isDark ? "light" : "dark",
      );
      return !isDark;
    });
  }, []);

  const theme = useMemo(
    () => ({
      isDarkMode,
      toggleDarkMode,
    }),
    [isDarkMode, toggleDarkMode],
  );

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
