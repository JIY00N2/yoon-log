"use client";

import useContentContext from "@/app/_context/ContentContext/useContentContext";
import stylex, { StyleXStyles } from "@stylexjs/stylex";
import { useFormStatus } from "react-dom";

export default function SubTitleInput({
  subTitle,
  style,
}: {
  subTitle: string;
  style: StyleXStyles;
}) {
  const { pending } = useFormStatus();
  const { isImageUploading } = useContentContext();

  return (
    <input
      name="subTitle"
      defaultValue={subTitle}
      placeholder="소제목을 입력해주세요.."
      disabled={pending || isImageUploading}
      {...stylex.props(styles.subTitle, style)}
    />
  );
}

const styles = stylex.create({
  subTitle: {
    fontSize: "1.2rem",
  },
});
