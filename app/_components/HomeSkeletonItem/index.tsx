import { animations } from "@/app/globalTokens.stylex";
import stylex from "@stylexjs/stylex";

const SUBTITLE_SKELETON_COUNT = 2;

export default async function HomeSkeletonItem() {
  return (
    <>
      <article {...stylex.props(styles.post)}>
        <div {...stylex.props(styles.link)}>
          <div {...stylex.props(styles.thumbnail, styles.animation)} />
          <div {...stylex.props(styles.text)}>
            <div {...stylex.props(styles.h)}>
              <div {...stylex.props(styles.h1, styles.animation)} />
              {Array.from({ length: SUBTITLE_SKELETON_COUNT }, (_, id) => (
                <div
                  key={id}
                  {...stylex.props(styles.h2, styles.animation)}
                />
              ))}
            </div>
            <div {...stylex.props(styles.infos, styles.animation)} />
          </div>
        </div>
      </article>
    </>
  );
}

const MEDIA_TABLET =
  "@media (min-width: 701px) and (max-width: 1100px)" as const;
const MEDIA_MOBILE = "@media (max-width: 700px)" as const;

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
  },
  h2: {
    display: "flex",
    width: "100%",
    height: "20px",
    borderRadius: "10px",
  },
  infos: {
    display: "flex",
    width: "200px",
    height: "20px",
    borderRadius: "10px",
  },
  animation: {
    animationName: animations.loadingAnimation,
    animationDuration: "1.8s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
});
