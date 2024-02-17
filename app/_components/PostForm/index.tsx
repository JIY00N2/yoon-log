"use client";

import { ChangeEvent, useCallback, useState } from "react";
import Image from "next/image";
import stylex from "@stylexjs/stylex";
import { useContentContext } from "@/app/_context/ContentContext";
import MDContent from "../MDContent";
import ImageForm from "@/app/(root)/write/ImageForm";
import { colors } from "@/app/tokens.stylex";

type Props = {
  handleSubmit: (formData: FormData) => Promise<void>;
  submitBtnText: string;
};

export const DEFAULT_THUMBNAIL_URL =
  "https://oxpdlbqcseajmjnxawbb.supabase.co/storage/v1/object/public/yoonBucket/pexels-pixabay-162616%20(1).jpg";

export default function PostForm({ handleSubmit, submitBtnText }: Props) {
  const { content, setContent, isCompletedUploading, setIsCompletedUploading } =
    useContentContext();
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

  return (
    <form
      action={handleSubmit}
      {...stylex.props(styles.layout)}
    >
      <input
        name="title"
        disabled={isCompletedUploading}
        placeholder="제목을 입력해주세요.."
        {...stylex.props(styles.input, styles.title)}
      />
      <input
        name="subTitle"
        disabled={isCompletedUploading}
        placeholder="소제목을 입력해주세요.."
        {...stylex.props(styles.input, styles.subTitle)}
      />
      <div {...stylex.props(styles.thumbnailContainer)}>
        <input
          name="thumbnailUrl"
          type="hidden"
          value={thumbnailUrl}
          disabled={isCompletedUploading}
        />
        <div {...stylex.props(styles.thumbnail)}>
          <Image
            src={thumbnailUrl}
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
          value={content}
          placeholder="내용을 입력해주세요.."
          onChange={(e) => setContent(e.target.value)}
          disabled={isCompletedUploading}
          {...stylex.props(styles.input, styles.textarea)}
        />
        <div {...stylex.props(styles.preview, styles.textarea)}>
          <MDContent source={content} />
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
    color: colors.black,
    backgroundColor: colors.greyOpacity200,
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
    borderColor: colors.black,
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
    color: colors.black,
    backgroundColor: colors.greyOpacity200,
    fontWeight: 600,
  },
});
