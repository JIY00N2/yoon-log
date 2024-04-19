import { animations } from "@/app/globalTokens.stylex";
import stylex from "@stylexjs/stylex";
import { Fragment } from "react";

const CONTENT_TEXT_COUNT = 20;
const CONTENT_TEXT_WIDTH_GAP = 4;

export default function Loading() {
  return (
    <div {...stylex.props(styles.layout)}>
      <div {...stylex.props(styles.container)}>
        <section {...stylex.props(styles.titleContainer)}>
          <h1 {...stylex.props(styles.title, styles.animation)} />
          <div {...stylex.props(styles.infos, styles.animation)} />
        </section>
        <section {...stylex.props(styles.subContainer)}>
          <div {...stylex.props(styles.thumbnail, styles.animation)} />
          <div {...stylex.props(styles.subTitle, styles.animation)} />
        </section>
        <section {...stylex.props(styles.contentContainer)}>
          <h1 {...stylex.props(styles.title, styles.animation)} />
          {Array.from({ length: CONTENT_TEXT_COUNT }, (_, i) => (
            <Fragment key={i}>
              {i % CONTENT_TEXT_WIDTH_GAP === 0 ? (
                <div
                  {...stylex.props(styles.content("100%"), styles.animation)}
                />
              ) : (
                <div
                  {...stylex.props(styles.content("80%"), styles.animation)}
                />
              )}
            </Fragment>
          ))}
        </section>
      </div>
    </div>
  );
}

const styles = stylex.create({
  layout: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "768px",
    gap: "2rem",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "2.25rem",
  },
  title: {
    height: "45px",
    width: "600px",
    borderRadius: "15px",
  },
  infos: {
    display: "flex",
    height: "28px",
    width: "200px",
    borderRadius: "10px",
  },
  subContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "3rem",
  },
  thumbnail: {
    display: "flex",
    borderRadius: "0.6rem",
    aspectRatio: "2",
    marginBottom: "1rem",
  },
  subTitle: {
    height: "28px",
    width: "500px",
    borderRadius: "10px",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "10px",
  },
  content: (width) => ({
    height: "16px",
    borderRadius: "10px",
    width,
  }),
  animation: {
    animationName: animations.loadingAnimation,
    animationDuration: "1.8s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
});
