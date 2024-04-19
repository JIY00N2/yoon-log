import HomeSkeletonItem from "@/app/_components/HomeSkeletonItem";
import TabSummary from "@/app/_components/TabSummary";
import stylex from "@stylexjs/stylex";

const POST_SKELETON_COUNT = 9;

export default function Loading() {
  return (
    <>
      <TabSummary
        title={"Loading..."}
        content={"Please wait a moment.."}
        color={"var(--text300)"}
      />
      <section {...stylex.props(styles.posts)}>
        {Array.from({ length: POST_SKELETON_COUNT }, (_, i) => (
          <HomeSkeletonItem key={i} />
        ))}
      </section>
    </>
  );
}

const MEDIA_TABLET =
  "@media (min-width: 701px) and (max-width: 1100px)" as const;
const MEDIA_MOBILE = "@media (max-width: 700px)" as const;

const styles = stylex.create({
  posts: {
    display: "grid",
    width: "auto",
    height: "auto",
    marginTop: "20px",
    gridTemplateColumns: {
      default: "repeat(3, 1fr)",
      [MEDIA_TABLET]: "repeat(2, 1fr)",
      [MEDIA_MOBILE]: "1fr",
    },
    gap: "1.5rem",
  },
});
