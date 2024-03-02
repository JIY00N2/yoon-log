"use client";

import { useEffect } from "react";
import stylex from "@stylexjs/stylex";
import { colors } from "./globalTokens.stylex";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: VoidFunction;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section {...stylex.props(styles.layout)}>
      <h1>문제가 발생했습니다.</h1>
      <button
        onClick={() => reset()}
        {...stylex.props(styles.button)}
      >
        재시도
      </button>
    </section>
  );
}

const styles = stylex.create({
  layout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "180px",
    gap: "0.5rem",
    color: "var(--font)",
  },
  button: {
    marginTop: "20px",
    paddingHorizontal: "1rem",
    paddingVertical: "0.5rem",
    borderRadius: "0.3rem",
    backgroundColor: colors.point,
    fontSize: "1.2rem",
    fontWeight: 700,
    color: colors.white,
  },
});
