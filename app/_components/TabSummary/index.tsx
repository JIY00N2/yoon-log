import { fonts } from "@/app/tokens.stylex";
import stylex from "@stylexjs/stylex";

type Props = {
  title: string;
  content: string;
};

export default function TabSummary({ title, content }: Props) {
  return (
    <section {...stylex.props(styles.section)}>
      <h1 {...stylex.props(fonts.l)}>{title}</h1>
      <p {...stylex.props(fonts.m)}>{content}</p>
    </section>
  );
}

const styles = stylex.create({
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
});
