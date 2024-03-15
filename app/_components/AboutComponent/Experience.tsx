import stylex from "@stylexjs/stylex";

export default function Experience() {
  return (
    <div {...stylex.props(styles.layout)}>
      <p>- 프로그래머스 데브코스 프런트엔드 4기 수료</p>
      <p>- 광운대학교 전자통신공학과 졸업</p>
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
  },
});
