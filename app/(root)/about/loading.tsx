import { animations } from "@/app/globalTokens.stylex";
import stylex from "@stylexjs/stylex";

const INFO_TEXT_COUNT = 10;

export default function Loading() {
  return (
    <div {...stylex.props(styles.layout)}>
      <div {...stylex.props(styles.container)}>
        <section {...stylex.props(styles.title, styles.animation)} />
        <hr {...stylex.props(styles.bar)} />
        <section {...stylex.props(styles.content)}>
          <div {...stylex.props(styles.profile, styles.animation)} />
          <div {...stylex.props(styles.infos)}>
            <div {...stylex.props(styles.infoTitle, styles.animation)} />
            {Array.from({ length: INFO_TEXT_COUNT }, (_, i) => (
              <div
                key={i}
                {...stylex.props(styles.infoText, styles.animation)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const MEDIA_MOBILE = "@media (max-width: 700px)" as const;

const styles = stylex.create({
  layout: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "768px",
    paddingHorizontal: "1rem",
    paddingVertical: "2rem",
    gap: "2rem",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  title: {
    width: "150px",
    height: "35px",
  },
  bar: {
    marginVertical: "1rem",
    color: "var(--text200)",
  },
  content: {
    display: "flex",
    gap: "1.5rem",
    flexDirection: {
      [MEDIA_MOBILE]: "column",
    },
    alignItems: {
      [MEDIA_MOBILE]: "center",
    },
    justifyContent: {
      [MEDIA_MOBILE]: "center",
    },
  },
  profile: {
    display: "flex",
    aspectRatio: "1",
    width: "100%",
    maxHeight: "250px",
    maxWidth: "250px",
  },
  infos: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    alignItems: {
      [MEDIA_MOBILE]: "center",
    },
    justifyContent: {
      [MEDIA_MOBILE]: "center",
    },
  },
  infoTitle: {
    width: "100%",
    height: "25px",
    marginBottom: "10px",
  },
  infoText: {
    display: "flex",
    width: "100%",
    height: "16px",
    flexDirection: "column",
    gap: "0.4rem",
  },
  animation: {
    animationName: animations.loadingAnimation,
    animationDuration: "1.8s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
    borderRadius: "10px",
  },
});
