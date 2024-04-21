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
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    const newTheme = newDarkModeState ? "dark" : "light";
    localStorage.setItem(key, newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
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
