import stylex from "@stylexjs/stylex";

const MEDIA_MOBILE = "@media (max-width: 767px)" as const;
const MEDIA_TABLET =
  "@media (min-width: 768px) and (max-width: 1023px)" as const;

export const fonts = stylex.create({
  l: {
    fontSize: "1.4rem",
    fontWeight: 600,
  },
  m: {
    fontSize: "1rem",
    fontWeight: 500,
  },
});

export const colors = stylex.defineVars({
  // grey50: "#f9fafb",
  // grey100: "#f2f4f6",
  // grey200: "#e5e8eb",
  // grey300: "#d1d6db",
  // grey400: "#b0b8c1",
  // grey500: "#8b95a1",
  // grey600: "#6b7684",
  // grey700: "#4e5968",
  // grey800: "#333d4b",
  // grey900: "#191f28",
  greyOpacity50: "rgba(0, 23, 51, 0.02)",
  greyOpacity100: "rgba(2, 32, 71, 0.05)",
  greyOpacity200: "rgba(0, 27, 55, 0.1)",
  greyOpacity300: "rgba(0, 29, 58, 0.18)",
  greyOpacity400: "rgba(0, 29, 54, 0.31)",
  greyOpacity500: "rgba(3, 24, 50, 0.46)",
  greyOpacity600: "rgba(0, 19, 43, 0.58)",
  greyOpacity700: " rgba(3, 18, 40, 0.7)",
  greyOpacity800: "rgba(0, 12, 30, 0.8)",
  greyOpacity900: "rgba(2, 9, 19, 0.91)",
  white: "#fff",
  black: "#171717",
  point: "rgb(3, 152, 178)",
});
