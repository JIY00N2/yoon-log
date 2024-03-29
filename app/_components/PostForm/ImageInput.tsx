"use client";

import { ChangeEvent, useCallback } from "react";
import stylex from "@stylexjs/stylex";
import { useFormStatus } from "react-dom";
import useDragAndDrop from "@/app/_hooks/useDragAndDrop";
import useContentContext from "@/app/_context/ContentContext/useContentContext";
import { colors } from "@/app/globalTokens.stylex";
import useToast from "@/app/_context/ToastContext/useToast";
import { Error, Success } from "../Toast";

export default function ImageInput() {
  const { setNewContent, isImageUploading, setIsImageUploading } =
    useContentContext();
  // pending은 PostForm의 form 내부의 button submit과 관련
  const { pending } = useFormStatus();
  const { toast } = useToast();

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
        let url = `<p align="center"><img src=${""} alt=${""} width="100%" height="100%"/></p>`;
        if (data.imageUrl) {
          url = `<p align="center"><img src="${data.imageUrl}" alt="${data.imageFileName}" width="100%" height="100%" /></p>`;
        }
        setNewContent((content) => content + url);
        toast(<Success message={"이미지 업로드 성공!"} />);
      } catch (error) {
        toast(<Error message={(error as Error).message} />);
      } finally {
        setIsImageUploading(false);
      }
    },
    [setNewContent, setIsImageUploading, toast],
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
          styles.draggingInput(isDragging ? colors.point : "var(--font)"),
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
    color: "var(--font)",
    borderStyle: "dashed",
    backgroundColor: "var(--text500)",
    fontWeight: 600,
    textAlign: "center",
    borderColor,
  }),
  defaultFileInput: {
    display: "none",
  },
});
