import stylex from "@stylexjs/stylex";

export default function Skills() {
  return (
    <div {...stylex.props(styles.layout)}>
      <span {...stylex.props(styles.skill)}>
        {"- TypeScript, React.js, Next.js"}
      </span>
      <span {...stylex.props(styles.skill)}>{"- Zustand, TanStack Query"}</span>
      <span {...stylex.props(styles.skill)}>{"- Tailwind CSS, StyleX"}</span>
      <span {...stylex.props(styles.skill)}>{"- MongoDB, Supabase"}</span>
    </div>
  );
}

const styles = stylex.create({
  layout: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "0.5rem",
  },
  skill: {
    fontSize: "1rem",
    color: "var(--font)",
    minWidth: "fit-content",
  },
});
