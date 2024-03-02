import stylex from "@stylexjs/stylex";

type Props = {
  title: string;
  content: string;
};

export default function TabSummary({ title, content }: Props) {
  return (
    <section {...stylex.props(styles.section)}>
      <h1 {...stylex.props(styles.title)}>{title}</h1>
      <p {...stylex.props(styles.content)}>{content}</p>
    </section>
  );
}

const styles = stylex.create({
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  title: {
    fontSize: "1.4rem",
    fontWeight: 600,
    color: "var(--font)",
  },
  content: {
    fontSize: "1rem",
    fontWeight: 500,
    color: "var(--font)",
  },
});
