"use client";

import stylex, { StyleXStyles } from "@stylexjs/stylex";
import { useFormStatus } from "react-dom";
import DynamicMDContent from "../MDContent/DynamicMDContent";
import useContentContext from "@/app/_context/ContentContext/useContentContext";

export default function ContentTextarea({ style }: { style: StyleXStyles }) {
  const { newContent, setNewContent, isImageUploading } = useContentContext();
  const { pending } = useFormStatus();

  return (
    <div {...stylex.props(styles.content)}>
      <textarea
        name="content"
        value={newContent}
        placeholder="내용을 입력해주세요.."
        onChange={(e) => setNewContent(e.target.value)}
        disabled={isImageUploading || pending}
        {...stylex.props(styles.textarea, style)}
      />
      <div {...stylex.props(styles.preview, styles.textarea)}>
        <DynamicMDContent source={newContent} />
      </div>
    </div>
  );
}

const styles = stylex.create({
  content: {
    display: "flex",
    width: "100%",
    gap: "1rem",
  },
  textarea: {
    width: "50%",
    flex: "1",
    minHeight: "700px",
    backgroundColor: "var(--backGround)",
    caretColor: "var(--font)",
  },
  preview: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "var(--font)",
    borderRadius: "1rem",
    padding: "1rem",
  },
});
