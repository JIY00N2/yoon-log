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
    const newTheme = localStorage.getItem(key);
    if (!newTheme) {
      localStorage.setItem(key, "light");
    } else {
      setIsDarkMode(newTheme === "dark");
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem(key, newDarkMode ? "dark" : "light");

    const htmlTag = document.getElementById("html");
    if (!htmlTag) {
      throw Error("html 태그가 없습니다.");
    }
    if (newDarkMode) {
      htmlTag.classList.add("dark");
    } else {
      htmlTag.classList.remove("dark");
    }
  }, [isDarkMode]);

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
