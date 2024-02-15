"use client";

import { useContentContext } from "@/app/_context/ContentContext";
import { ChangeEvent, useCallback } from "react";

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
    <input
      type="file"
      onChange={handleInputChange}
      disabled={isCompletedUploading}
    />
  );
}
