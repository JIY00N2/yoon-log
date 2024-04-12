import stylex from "@stylexjs/stylex";
import { useFormStatus } from "react-dom";
import CommentSVG from "@/public/images/comment.svg";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      {...stylex.props(styles.button, pending && styles.isPending)}
    >
      <CommentSVG
        color={"var(--font)"}
        width={30}
        height={30}
      />
    </button>
  );
}

const styles = stylex.create({
  button: {
    display: "flex",
    color: "var(--font)",
  },
  isPending: {
    cursor: "not-allowed",
  },
});
