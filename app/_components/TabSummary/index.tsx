import stylex from "@stylexjs/stylex";

type Props = {
  title: string;
  content: string;
  color?: string;
};

export default function TabSummary({
  title,
  content,
  color = "var(--font)",
}: Props) {
  return (
    <section {...stylex.props(styles.section)}>
      <h1 {...stylex.props(styles.title(color))}>{title}</h1>
      <p {...stylex.props(styles.content(color))}>{content}</p>
    </section>
  );
}

const styles = stylex.create({
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  title: (color) => ({
    fontSize: "1.4rem",
    fontWeight: 600,
    color,
  }),
  content: (color) => ({
    fontSize: "1rem",
    fontWeight: 500,
    color,
  }),
});
