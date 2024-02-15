"use client";

import { useContentContext } from "@/app/_context/ContentContext";
import { ChangeEvent } from "react";

export default function ImageForm() {
  const { setContent } = useContentContext();
  async function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
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
  }

  return (
    <input
      type="file"
      onChange={handleInputChange}
    />
  );
}
