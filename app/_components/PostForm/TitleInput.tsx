import { useContentContext } from "@/app/_context/ContentContext";
import stylex, { StyleXStyles } from "@stylexjs/stylex";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function TitleInput({
  title,
  style,
}: {
  title: string;
  style: StyleXStyles;
}) {
  const [newTitle, setNewTitle] = useState(title);
  const { isImageUploading } = useContentContext();
  const { pending } = useFormStatus();

  return (
    <input
      name="title"
      placeholder="제목을 입력해주세요.."
      value={newTitle}
      onChange={(e) => setNewTitle(e.target.value)}
      disabled={pending || isImageUploading}
      {...stylex.props(styles.title, style)}
    />
  );
}

const styles = stylex.create({
  title: {
    minHeight: "50px",
    fontSize: "1.5rem",
  },
});
