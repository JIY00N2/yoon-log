import stylex from "@stylexjs/stylex";

export default function Skills() {
  return (
    <div {...stylex.props(styles.layout)}>
      <p>{"- TypeScript, React.js, Next.js"}</p>
      <p>{"- Zustand, TanStack Query"}</p>
      <p>{"- Tailwind CSS, StyleX"}</p>
      <p>{"- MongoDB, Supabase"}</p>
    </div>
  );
}

const styles = stylex.create({
  layout: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "0.5rem",
    fontSize: "1rem",
    color: "var(--font)",
    minWidth: "fit-content",
  },
});
