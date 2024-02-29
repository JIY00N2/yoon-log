"use client";

import { ChangeEvent, useCallback } from "react";
import stylex from "@stylexjs/stylex";
import { useFormStatus } from "react-dom";
import useDragAndDrop from "@/app/_hooks/useDragAndDrop";
import useContentContext from "@/app/_context/ContentContext/useContentContext";

export default function ImageInput() {
  const { setNewContent, isImageUploading, setIsImageUploading } =
    useContentContext();
  // pending은 PostForm의 form 내부의 button submit과 관련
  const { pending } = useFormStatus();

  const uploadFile = useCallback(
    async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      setIsImageUploading(true);
      try {
        const res = await fetch("/api/admin/upload", {
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

  const handleFileInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | DragEvent) => {
      let file;
      if ("dataTransfer" in e) {
        file = e.dataTransfer?.files[0];
      } else {
        file = e.target.files?.[0];
      }
      if (file) {
        uploadFile(file);
      }
    },
    [uploadFile],
  );

  const [isDragging, dragRef] = useDragAndDrop<HTMLLabelElement>(
    handleFileInputChange,
  );

  const getLabelName = () => {
    if (pending) {
      return "제출 중..";
    }
    if (isImageUploading) {
      return "업로드 중..";
    }
    return "여기를 클릭하거나 드래그하여 이미지 업로드";
  };

  return (
    <>
      <label
        htmlFor="image"
        {...stylex.props(
          styles.draggingInput(isDragging ? "rgb(3, 152, 178)" : "#171717"),
        )}
        ref={dragRef}
      >
        {getLabelName()}
      </label>
      <input
        id="image"
        type="file"
        onChange={handleFileInputChange}
        disabled={pending || isImageUploading}
        {...stylex.props(styles.defaultFileInput)}
      />
    </>
  );
}

const styles = stylex.create({
  draggingInput: (borderColor: string) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "200px",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
    color: "#171717",
    borderStyle: "dashed",
    backgroundColor: "rgba(2, 32, 71, 0.05)",
    fontWeight: 600,
    textAlign: "center",
    borderColor,
  }),
  defaultFileInput: {
    display: "none",
  },
});
