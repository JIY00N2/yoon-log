"use client";

import { useContentContext } from "@/app/_context/ContentContext";
import stylex, { StyleXStyles } from "@stylexjs/stylex";
import Image from "next/image";
import { ChangeEvent, useCallback, useState } from "react";
import { useFormStatus } from "react-dom";

export const DEFAULT_THUMBNAIL_URL =
  "https://oxpdlbqcseajmjnxawbb.supabase.co/storage/v1/object/public/yoonBucket/pexels-pixabay-162616%20(1).jpg";

export default function ThumbnailInput({
  thumbnailUrl,
  style,
}: {
  thumbnailUrl: string;
  style: StyleXStyles;
}) {
  const { setIsImageUploading, isImageUploading } = useContentContext();
  const { pending } = useFormStatus();
  const [newThumbnailUrl, setNewThumbnailUrl] = useState(
    thumbnailUrl || DEFAULT_THUMBNAIL_URL,
  );

  const handleThumbnailInputChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      setIsImageUploading(true);
      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        const data = (await res.json()) as { imageUrl: string };
        if (data.imageUrl) {
          setNewThumbnailUrl(data.imageUrl);
        }
      } catch (error) {
        // TODO: 토스트 ui
        console.error(error);
      } finally {
        setIsImageUploading(false);
      }
    },
    [setIsImageUploading],
  );

  const getLabelName = () => {
    if (pending) {
      return "제출 중..";
    }
    if (isImageUploading) {
      return "업로드 중..";
    }
    return "썸네일 업로드";
  };

  return (
    <div {...stylex.props(styles.thumbnailContainer)}>
      <input
        name="thumbnailUrl"
        type="hidden"
        value={newThumbnailUrl}
      />
      <div {...stylex.props(styles.thumbnail)}>
        <Image
          src={newThumbnailUrl}
          alt="thumbnail"
          priority
          layout="fill"
          objectFit="cover"
        />
      </div>
      <label
        htmlFor="thumbnail"
        {...stylex.props(styles.thumbnailInput)}
      >
        {getLabelName()}
      </label>
      <input
        id="thumbnail"
        name="thumbnail"
        type="file"
        onChange={handleThumbnailInputChange}
        disabled={pending || isImageUploading}
        {...stylex.props(style)}
      />
    </div>
  );
}

const styles = stylex.create({
  thumbnailContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  thumbnail: {
    display: "flex",
    width: "50%",
    minHeight: "300px",
    position: "relative",
    borderRadius: "0.6rem",
    overflow: "hidden",
  },
  thumbnailInput: {
    padding: "0.5rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
    color: "#171717",
    backgroundColor: "rgba(2, 32, 71, 0.05)",
    fontWeight: 600,
  },
});
