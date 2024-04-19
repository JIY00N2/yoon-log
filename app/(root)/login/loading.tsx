import { animations } from "@/app/globalTokens.stylex";
import stylex from "@stylexjs/stylex";

export default function Loading() {
  return (
    <section {...stylex.props(styles.layout)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.boxContainer)}>
          <div {...stylex.props(styles.box)}>
            <h1 {...stylex.props(styles.h1, styles.animation)} />
            <h2 {...stylex.props(styles.h2, styles.animation)} />
          </div>
          <div {...stylex.props(styles.box)}>
            <h2 {...stylex.props(styles.input, styles.animation)} />
          </div>
          <div {...stylex.props(styles.button, styles.animation)} />
        </div>
      </div>
    </section>
  );
}

const MEDIA_TABLET =
  "@media (min-width: 500px) and (max-width: 1100px)" as const;
const MEDIA_MOBILE = "@media (max-width: 500px)" as const;

const styles = stylex.create({
  layout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "400px",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  boxContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "1rem",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "var(--text300)",
    gap: "1rem",
    width: {
      default: "440px",
      [MEDIA_MOBILE]: "320px",
    },
    height: {
      default: "215px",
      [MEDIA_MOBILE]: "238px",
    },
  },
  box: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "0.5rem",
  },
  h1: {
    width: "60%",
    height: "28px",
  },
  h2: {
    width: "100%",
    height: "23px",
  },
  input: {
    width: "100%",
    minHeight: "20px",
    padding: "1rem",
    borderRadius: "1rem",
  },
  button: {
    width: "30%",
    height: "35px",
    borderRadius: "0.5rem",
    padding: "0.5rem 1rem 0.5rem 1rem",
  },
  animation: {
    animationName: animations.loadingAnimation,
    animationDuration: "1.8s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
    borderRadius: "10px",
  },
});
