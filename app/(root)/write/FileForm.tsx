"use client";

import { ChangeEvent } from "react";

export default function FileForm() {
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
    const data = (await res.json()) as { imageUrl: string | undefined };
    if (data.imageUrl) {
      console.log(data.imageUrl);
    }
  }

  return (
    <input
      type="file"
      onChange={handleInputChange}
    />
  );
}
