import { colors } from "@/app/globalTokens.stylex";
import stylex from "@stylexjs/stylex";
import { PropsWithChildren } from "react";

export default function Container({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return (
    <section {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.title)}>{title}</h1>
      <hr {...stylex.props(styles.bar)} />
      {children}
    </section>
  );
}

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: colors.point,
  },
  bar: {
    marginVertical: "1rem",
    color: "var(--text200)",
  },
});
