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
    <div {...stylex.props(styles.container)}>
      <button
        type="submit"
        disabled={pending || isImageUploading}
        {...stylex.props(styles.button)}
      >
        {getLabelName()}
      </button>
    </div>
  );
}

const styles = stylex.create({
  container: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    padding: "0.5rem 1rem 0.5rem 1rem",
    borderRadius: "0.5rem",
    color: "#171717",
    backgroundColor: "rgba(2, 32, 71, 0.05)",
    fontWeight: 600,
  },
});
