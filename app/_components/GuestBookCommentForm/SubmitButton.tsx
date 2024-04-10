import stylex from "@stylexjs/stylex";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
    >
      {pending ? "제출 중.." : "쓰기"}
    </button>
  );
}

const styles = stylex.create({});
