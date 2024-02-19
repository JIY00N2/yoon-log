"use client";

import { ChangeEvent, useCallback } from "react";
import stylex from "@stylexjs/stylex";
import { useContentContext } from "@/app/_context/ContentContext";
import { useFormStatus } from "react-dom";

export default function ImageInput() {
  const { setNewContent, isImageUploading, setIsImageUploading } =
    useContentContext();
  // pending은 PostForm의 form 내부의 button submit과 관련
  const { pending } = useFormStatus();

  const handleInputChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const formData = new FormData();
      if (!e.target.files) {
        return;
      }
      formData.append("file", e.target.files[0]);
      setIsImageUploading(true);
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = (await res.json()) as {
          imageFileName: string;
          imageUrl: string;
        };
        let url = "![이미지...]()";
        if (data.imageUrl) {
          url = `![${data.imageFileName}](${data.imageUrl})`;
        }
        setNewContent((content) => content + url);
      } catch (error) {
        // TODO: 토스트 ui
      } finally {
        setIsImageUploading(false);
      }
    },
    [setNewContent, setIsImageUploading],
  );

  const getLabelName = () => {
    if (pending) {
      return "제출 중..";
    }
    if (isImageUploading) {
      return "업로드 중..";
    }
    return "이미지 업로드";
  };

  return (
    <>
      <label
        htmlFor="image"
        {...stylex.props(styles.image)}
      >
        {getLabelName()}
      </label>
      <input
        id="image"
        type="file"
        onChange={handleInputChange}
        disabled={pending || isImageUploading}
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
    color: "#171717",
    backgroundColor: "rgba(0, 27, 55, 0.1)",
    fontWeight: 600,
  },
  defaultFileInput: {
    display: "none",
  },
});
