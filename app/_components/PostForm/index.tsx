"use client";

import stylex from "@stylexjs/stylex";
import TitleInput from "./TitleInput";
import SubTitleInput from "./SubTitleInput";
import ThumbnailInput from "./ThumbnailInput";
import ImageInput from "@/app/_components/PostForm/ImageInput";
import ContentTextarea from "./ContentTextarea";
import SubmitButton from "./SubmitButton";

type Props = {
  handleSubmit: (formData: FormData) => Promise<void>;
  title: string;
  subTitle: string;
  thumbnailUrl: string;
  submitBtnName: string;
};

export default function PostForm({
  handleSubmit,
  title,
  subTitle,
  thumbnailUrl,
  submitBtnName,
}: Props) {
  // action 속성을 갖고있는 폼 태그 내부안의 컴포넌트에서 useFormStatus를 사용하면 form의 action 상태를 알 수 있다.
  return (
    <form
      action={handleSubmit}
      {...stylex.props(styles.layout)}
    >
      <TitleInput
        title={title}
        style={styles.defaultInput}
      />
      <SubTitleInput
        subTitle={subTitle}
        style={styles.defaultInput}
      />
      <ThumbnailInput
        thumbnailUrl={thumbnailUrl}
        style={styles.defaultFileInput}
      />
      <ImageInput />
      <ContentTextarea style={styles.defaultInput} />
      <SubmitButton name={submitBtnName} />
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
  defaultInput: {
    width: "100%",
    padding: "1rem",
    borderRadius: "1rem",
  },
  defaultFileInput: {
    display: "none",
  },
});
