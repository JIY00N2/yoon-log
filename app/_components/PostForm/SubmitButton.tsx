"use client";

import useContentContext from "@/app/_context/ContentContext/useContentContext";
import stylex from "@stylexjs/stylex";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ name }: { name: string }) {
  const { pending } = useFormStatus();
  const { isImageUploading } = useContentContext();

  const getLabelName = () => {
    if (pending) {
      return "제출 중..";
    }
    if (isImageUploading) {
      return "업로드 중..";
    }
    return name;
  };

  return (
    <button
      type="submit"
      disabled={pending || isImageUploading}
      {...stylex.props(styles.button)}
    >
      {getLabelName()}
    </button>
  );
}

const styles = stylex.create({
  button: {
    padding: "0.5rem 1rem 0.5rem 1rem",
    borderRadius: "0.5rem",
    color: "var(--font)",
    backgroundColor: "var(--text500)",
    fontWeight: 600,
  },
});
