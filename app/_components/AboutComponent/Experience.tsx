import stylex from "@stylexjs/stylex";

export default function Experience() {
  return (
    <div {...stylex.props(styles.layout)}>
      <p>- 프로그래머스 데브코스 프런트엔드 4기 수료 (2023.06 ~ 2023.12)</p>
      <p>- 광운대학교 전자통신공학과 졸업 (2021.03 ~ 2023.02)</p>
      <p>- 홍익대학교 세종캠퍼스 소프트웨어융합학과 자퇴 (2018.03 ~ 2020.02)</p>
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
