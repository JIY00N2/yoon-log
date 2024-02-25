"use client";

import { useContentContext } from "@/app/_context/ContentContext";
import stylex, { StyleXStyles } from "@stylexjs/stylex";
import { useFormStatus } from "react-dom";

export default function TitleInput({
  title,
  style,
}: {
  title: string;
  style: StyleXStyles;
}) {
  const { isImageUploading } = useContentContext();
  const { pending } = useFormStatus();

  return (
    <input
      name="title"
      placeholder="제목을 입력해주세요.."
      defaultValue={title}
      disabled={pending || isImageUploading}
      {...stylex.props(styles.title, style)}
    />
  );
}

const styles = stylex.create({
  title: {
    fontSize: "1.5rem",
  },
});
