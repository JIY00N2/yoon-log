import { useState } from "react";
import stylex, { StyleXStyles } from "@stylexjs/stylex";
import { useFormStatus } from "react-dom";
import { useContentContext } from "@/app/_context/ContentContext";

export default function SubTitleInput({
  subTitle,
  style,
}: {
  subTitle: string;
  style: StyleXStyles;
}) {
  const [newSubTitle, setNewSubTitle] = useState(subTitle);
  const { pending } = useFormStatus();
  const { isImageUploading } = useContentContext();

  return (
    <input
      name="subTitle"
      value={newSubTitle}
      placeholder="소제목을 입력해주세요.."
      onChange={(e) => setNewSubTitle(e.target.value)}
      disabled={pending || isImageUploading}
      {...stylex.props(styles.subTitle, style)}
    />
  );
}

const styles = stylex.create({
  subTitle: {
    minHeight: "40px",
    fontSize: "1.2rem",
  },
});
