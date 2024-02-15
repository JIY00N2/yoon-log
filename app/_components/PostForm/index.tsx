"use client";

import { useContentContext } from "@/app/_context/ContentContext";
import MDContent from "../MDContent";
import { useCallback, useState } from "react";

type Props = {
  handleSubmit: (formData: FormData) => Promise<void>;
  submitBtnText: string;
};

export default function PostForm({ handleSubmit, submitBtnText }: Props) {
  const { content, setContent } = useContentContext();
  const [isPreview, setIsPreview] = useState(false);

  const handleButtonClick = useCallback(
    () => setIsPreview((prev) => !prev),
    [],
  );

  return (
    <form action={handleSubmit}>
      <input name="title" />
      <input name="subTitle" />
      {isPreview ? (
        <MDContent source={content} />
      ) : (
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      )}
      <button
        type="button"
        onClick={handleButtonClick}
      >
        미리보기
      </button>
      <button type="submit">{submitBtnText}</button>
    </form>
  );
}
