import TabSummary from "@/app/_components/TabSummary";
import { animations } from "@/app/globalTokens.stylex";
import stylex from "@stylexjs/stylex";

const COMMENT_WIDTH = [120, 270, 150, 300];
const COMMENT_ITEM_COUNT = 12;

export default function Loading() {
  return (
    <>
      <TabSummary
        title={"Loading..."}
        content={"Please wait a moment.."}
        color={"var(--text300)"}
      />
      <section {...stylex.props(styles.inputContainer)}>
        <div {...stylex.props(styles.input, styles.animation)} />
      </section>
      <section {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.comments)}>
          <div {...stylex.props(styles.comment)}>
            {Array.from({ length: COMMENT_ITEM_COUNT }, (_, i) => (
              <div
                key={i}
                {...stylex.props(styles.bubble)}
              >
                <div {...stylex.props(styles.date, styles.animation)} />
                <div
                  {...stylex.props(
                    styles.message(COMMENT_WIDTH[i % COMMENT_WIDTH.length]),
                    styles.animation,
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const styles = stylex.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginVertical: "20px",
  },
  input: {
    width: "600px",
    height: "35px",
    borderRadius: "10px",
    paddingHorizontal: "10px",
    backgroundColor: "gray",
  },
  comments: {
    display: "flex",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "10px",
  },
  comment: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    gap: "10px",
    flexDirection: "column",
  },
  bubble: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: "5px",
  },
  date: {
    width: "64px",
    height: "18px",
    borderRadius: "10px",
  },
  message: (width) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "40px",
    borderRadius: "10px",
    borderBottomRightRadius: "0px",
    padding: "10px",
    width,
  }),
  animation: {
    animationName: animations.loadingAnimation,
    animationDuration: "1.8s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
});
