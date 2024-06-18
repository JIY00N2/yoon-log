"use client";

import useTheme from "@/app/_context/ThemeContext/useTheme";
import stylex from "@stylexjs/stylex";
import Image from "next/image";
import { ThemeTooltip } from "../Tooltip/ThemeTooltip";

export default function ThemeButton() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <ThemeTooltip isDark={isDarkMode}>
      <button
        onClick={toggleDarkMode}
        {...stylex.props(styles.button)}
      >
        {isDarkMode ? (
          <Image
            src={"/images/light-mode.svg"}
            alt="light-mode"
            width={22}
            height={22}
          />
        ) : (
          <Image
            src={"/images/dark-mode.svg"}
            alt="dark-mode"
            width={22}
            height={22}
          />
        )}
      </button>
    </ThemeTooltip>
  );
}

const styles = stylex.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
