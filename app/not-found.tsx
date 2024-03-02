import Link from "next/link";
import stylex from "@stylexjs/stylex";
import { colors } from "./globalTokens.stylex";

export default function NotFound() {
  return (
    <section {...stylex.props(styles.layout)}>
      <h1>Not Found 404</h1>
      <p>요청한 리소스를 찾을 수 없습니다.</p>
      <Link
        href="/"
        {...stylex.props(styles.link)}
      >
        홈으로
      </Link>
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
  link: {
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
