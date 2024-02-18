"use client";

import { ChangeEvent, useCallback, useState } from "react";
import Image from "next/image";
import stylex from "@stylexjs/stylex";
import { useContentContext } from "@/app/_context/ContentContext";
import MDContent from "../MDContent";
import ImageForm from "@/app/(root)/write/ImageForm";

type Props = {
  handleSubmit: (formData: FormData) => Promise<void>;
  submitBtnText: string;
  title: string;
  subTitle: string;
  thumbnailUrl: string;
};

// TODO: 스크롤위치, 관리자 꾸미기, 사이드바, 다크모드, 스크롤 탑, 토스트ui, drop and drop

export const DEFAULT_THUMBNAIL_URL =
  "https://oxpdlbqcseajmjnxawbb.supabase.co/storage/v1/object/public/yoonBucket/pexels-pixabay-162616%20(1).jpg";

export default function PostForm({
  handleSubmit,
  submitBtnText,
  title,
  subTitle,
  thumbnailUrl,
}: Props) {
  const {
    newContent,
    setNewContent,
    isCompletedUploading,
    setIsCompletedUploading,
  } = useContentContext();
  const [newTitle, setNewTitle] = useState(title);
  const [newSubTitle, setNewSubTitle] = useState(subTitle);
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
      setIsCompletedUploading(true);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as { imageUrl: string };
      if (data.imageUrl) {
        setNewThumbnailUrl(data.imageUrl);
      }
      setIsCompletedUploading(false);
    },
    [setIsCompletedUploading],
  );

  return (
    <form
      action={handleSubmit}
      {...stylex.props(styles.layout)}
    >
      <input
        name="title"
        disabled={isCompletedUploading}
        placeholder="제목을 입력해주세요.."
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        {...stylex.props(styles.input, styles.title)}
      />
      <input
        name="subTitle"
        disabled={isCompletedUploading}
        placeholder="소제목을 입력해주세요.."
        value={newSubTitle}
        onChange={(e) => setNewSubTitle(e.target.value)}
        {...stylex.props(styles.input, styles.subTitle)}
      />
      <div {...stylex.props(styles.thumbnailContainer)}>
        <input
          name="thumbnailUrl"
          type="hidden"
          value={newThumbnailUrl}
          disabled={isCompletedUploading}
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
          썸네일 업로드
        </label>
        <input
          id="thumbnail"
          name="thumbnail"
          type="file"
          onChange={handleThumbnailInputChange}
          disabled={isCompletedUploading}
          {...stylex.props(styles.defaultFileInput)}
        />
      </div>
      <ImageForm />
      <div {...stylex.props(styles.content)}>
        <textarea
          name="content"
          value={newContent}
          placeholder="내용을 입력해주세요.."
          onChange={(e) => setNewContent(e.target.value)}
          disabled={isCompletedUploading}
          {...stylex.props(styles.input, styles.textarea)}
        />
        <div {...stylex.props(styles.preview, styles.textarea)}>
          <MDContent source={newContent} />
        </div>
      </div>
      <div {...stylex.props(styles.button)}>
        <button
          type="submit"
          disabled={isCompletedUploading}
          {...stylex.props(styles.submitBtn)}
        >
          {submitBtnText}
        </button>
      </div>
    </form>
  );
}

const styles = stylex.create({
  layout: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    gap: "1rem",
  },
  input: {
    width: "100%",
    padding: "1rem",
    borderRadius: "1rem",
  },
  title: {
    minHeight: "50px",
    fontSize: "1.5rem",
  },
  subTitle: {
    minHeight: "40px",
    fontSize: "1.2rem",
  },
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
    borderRadius: "10px",
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
  defaultFileInput: {
    display: "none",
  },
  content: {
    display: "flex",
    gap: "1rem",
  },
  textarea: {
    width: "100%",
    minHeight: "700px",
  },
  preview: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#171717",
    borderRadius: "1rem",
    padding: "1rem",
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  submitBtn: {
    padding: "0.5rem 1rem 0.5rem 1rem",
    borderRadius: "0.5rem",
    color: "#171717",
    backgroundColor: "rgba(2, 32, 71, 0.05)",
    fontWeight: 600,
  },
});
