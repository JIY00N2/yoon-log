import stylex from "@stylexjs/stylex";

const loadingAnimation = stylex.keyframes({
  "0%": { backgroundColor: "var(--skeletonDefault)" },
  "50%": { backgroundColor: "var(--skeletonGradient)" },
  "100%": { backgroundColor: "var(--skeletonDefault)" },
});

export const colors = stylex.defineVars({
  red: "#fa4d47",
  green: "#35dd65",
  point: "rgb(3, 152, 178)",
  white: "#ffffff",
  gray: "#757575",
});

export const animations = stylex.defineVars({
  loadingAnimation,
});
