import stylex from "@stylexjs/stylex";

export default async function HomeSkeletonItem() {
  return (
    <>
      <article {...stylex.props(styles.post)}>
        <div {...stylex.props(styles.link)}>
          <div {...stylex.props(styles.thumbnail)} />
          <div {...stylex.props(styles.text)}>
            <div {...stylex.props(styles.h)}>
              <div {...stylex.props(styles.h1)} />
              <div {...stylex.props(styles.h2)} />
              <div {...stylex.props(styles.h2)} />
            </div>
            <div {...stylex.props(styles.infos)} />
          </div>
        </div>
      </article>
    </>
  );
}

const MEDIA_TABLET =
  "@media (min-width: 701px) and (max-width: 1100px)" as const;
const MEDIA_MOBILE = "@media (max-width: 700px)" as const;

const loadingAnimation = stylex.keyframes({
  "0%": { backgroundColor: "var(--skeletonDefault)" },
  "50%": { backgroundColor: "var(--skeletonGradient)" },
  "100%": { backgroundColor: "var(--skeletonDefault)" },
});

const styles = stylex.create({
  post: {
    width: "100%",
    height: "350px",
    paddingBottom: "1rem",
  },
  link: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    gap: "0.7rem",
  },
  thumbnail: {
    display: "flex",
    aspectRatio: "2",
    minHeight: {
      default: "185px",
      [MEDIA_TABLET]: "0px",
      [MEDIA_MOBILE]: "0px",
    },
    position: "relative",
    borderRadius: "0.6rem",
    overflow: "hidden",
    animationName: loadingAnimation,
    animationDuration: "1.8s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
  text: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "auto",
    flexGrow: "1",
    justifyContent: "space-between",
    gap: "0.3rem",
  },
  h: {
    display: "flex",
    width: "350px",
    height: "100%",
    flexDirection: "column",
    gap: "0.5rem",
  },
  h1: {
    display: "flex",
    width: "80%",
    height: "28px",
    borderRadius: "10px",
    animationName: loadingAnimation,
    animationDuration: "1.8s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
  h2: {
    display: "flex",
    width: "100%",
    height: "20px",
    borderRadius: "10px",
    animationName: loadingAnimation,
    animationDuration: "1.8s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
  infos: {
    display: "flex",
    width: "200px",
    height: "20px",
    borderRadius: "10px",
    animationName: loadingAnimation,
    animationDuration: "1.8s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
});
