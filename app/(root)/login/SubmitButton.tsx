import stylex from "@stylexjs/stylex";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      {...stylex.props(styles.button)}
      disabled={pending}
    >
      {pending ? "로그인 중.." : "로그인"}
    </button>
  );
}

const styles = stylex.create({
  button: {
    borderRadius: "0.5rem",
    padding: "0.5rem 1rem 0.5rem 1rem",
    backgroundColor: "var(--text500)",
    fontSize: "0.9rem",
    fontWeight: 700,
    color: "var(--font)",
  },
});
