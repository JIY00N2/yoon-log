import GuestBookCommentForm from "@/app/(root)/guestbook/GuestBookCommentForm";
import TabSummary from "@/app/_components/TabSummary";
import { GuestBookService } from "@/app/_lib/guestbook/service";
import stylex from "@stylexjs/stylex";
import formattedDate from "./formattedDate";
import { guestbookAction } from "./guestbookAction";
import generateBackgroundColor from "./generateBackgroundColor";

export default async function GuestBookPage() {
  const comments = await GuestBookService.getComments();

  return (
    <>
      <TabSummary
        title={"익명 방명록"}
        content={`총 ${comments.length}개의 방명록`}
      />
      <GuestBookCommentForm handleSubmit={guestbookAction} />
      <section {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.comments)}>
          {comments.map((comment) => (
            <div
              key={comment._id.toString()}
              {...stylex.props(styles.comment)}
            >
              <div {...stylex.props(styles.bubble)}>
                <span {...stylex.props(styles.date)}>
                  {formattedDate(comment.createdAt)}
                </span>
                <span
                  {...stylex.props(
                    styles.message,
                    styles.bg(generateBackgroundColor(comment.createdAt)),
                  )}
                >
                  {comment.comment}
                </span>
              </div>
            </div>
          ))}
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
    whiteSpace: "pre-line",
    marginHorizontal: "10rem",
    gap: "10rem",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bubble: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: "5px",
  },
  date: {
    fontSize: "0.8rem",
    color: "var(--font)",
  },
  message: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "40px",
    borderRadius: "10px",
    borderBottomRightRadius: "0px",
    padding: "10px",
    fontSize: "0.9rem",
    wordBreak: "break-all",
  },
  bg: (backgroundColor: string) => ({
    backgroundColor,
  }),
});
