"use client";

import { ChangeEvent, useCallback } from "react";
import stylex from "@stylexjs/stylex";
import { useContentContext } from "@/app/_context/ContentContext";
import { colors } from "@/app/tokens.stylex";

export default function ImageForm() {
  const { setContent, isCompletedUploading } = useContentContext();
  const handleInputChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const formData = new FormData();
      if (!e.target.files) {
        return;
      }
      formData.append("file", e.target.files[0]);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as {
        imageFileName: string;
        imageUrl: string;
      };
      let url = "![로딩중...]()";
      if (data.imageUrl) {
        url = `![${data.imageFileName}](${data.imageUrl})`;
      }
      setContent((content) => content + url);
    },
    [setContent],
  );

  return (
    <>
      <label
        htmlFor="image"
        {...stylex.props(styles.image)}
      >
        이미지 업로드
      </label>
      <input
        id="image"
        type="file"
        onChange={handleInputChange}
        disabled={isCompletedUploading}
        {...stylex.props(styles.defaultFileInput)}
      />
    </>
  );
}

const styles = stylex.create({
  image: {
    width: "fit-content",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
    color: colors.black,
    backgroundColor: colors.greyOpacity200,
    fontWeight: 600,
  },
  defaultFileInput: {
    display: "none",
  },
});
