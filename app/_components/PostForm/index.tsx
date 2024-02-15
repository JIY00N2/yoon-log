"use client";

import { useContentContext } from "@/app/_context/ContentContext";
import MDContent from "../MDContent";
import { ChangeEvent, useCallback, useState } from "react";
import Image from "next/image";

type Props = {
  handleSubmit: (formData: FormData) => Promise<void>;
  submitBtnText: string;
};

export const DEFAULT_THUMBNAIL_URL =
  "https://oxpdlbqcseajmjnxawbb.supabase.co/storage/v1/object/public/yoonBucket/defaultThumbnail.jpg";

export default function PostForm({ handleSubmit, submitBtnText }: Props) {
  const { content, setContent, isCompletedUploading, setIsCompletedUploading } =
    useContentContext();
  const [isPreview, setIsPreview] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState(DEFAULT_THUMBNAIL_URL);

  const handleThumbnailInputChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      setIsCompletedUploading(true);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as { imageUrl: string };
      if (data.imageUrl) {
        setThumbnailUrl(data.imageUrl);
      }
      setIsCompletedUploading(false);
    },
    [setIsCompletedUploading],
  );

  const handleButtonClick = useCallback(
    () => setIsPreview((prev) => !prev),
    [],
  );

  return (
    <form action={handleSubmit}>
      <input
        name="title"
        disabled={isCompletedUploading}
      />
      <input
        name="subTitle"
        disabled={isCompletedUploading}
      />
      <input
        name="thumbnailUrl"
        type="hidden"
        value={thumbnailUrl}
        disabled={isCompletedUploading}
      />
      <input
        type="file"
        onChange={handleThumbnailInputChange}
        disabled={isCompletedUploading}
      />
      <Image
        src={thumbnailUrl}
        alt="thumbnail"
        priority
        width={100}
        height={100}
      />
      {isPreview ? (
        <MDContent source={content} />
      ) : (
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isCompletedUploading}
        />
      )}
      <button
        type="button"
        onClick={handleButtonClick}
        disabled={isCompletedUploading}
      >
        미리보기
      </button>
      <button
        type="submit"
        disabled={isCompletedUploading}
      >
        {submitBtnText}
      </button>
    </form>
  );
}
