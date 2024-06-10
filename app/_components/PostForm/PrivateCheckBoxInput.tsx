import stylex from "@stylexjs/stylex";
import { useFormStatus } from "react-dom";

export default function PrivateCheckBoxInput({
  isPrivate,
}: {
  isPrivate: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <div {...stylex.props(styles.inputContainer)}>
      <label>비공개</label>
      <input
        type="checkbox"
        name="isPrivate"
        defaultChecked={isPrivate}
        disabled={pending}
      />
    </div>
  );
}

const styles = stylex.create({
  inputContainer: {
    display: "flex",
    gap: "10px",
  },
});
