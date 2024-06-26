"use client";

import stylex from "@stylexjs/stylex";
import TitleInput from "./TitleInput";
import SubTitleInput from "./SubTitleInput";
import ThumbnailInput from "./ThumbnailInput";
import ImageInput from "@/app/_components/PostForm/ImageInput";
import ContentTextarea from "./ContentTextarea";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SlugInput from "./SlugInput";
import useToast from "@/app/_context/ToastContext/useToast";
import { Error, Success } from "../Toast";
import PrivateCheckBoxInput from "./PrivateCheckBoxInput";

type Props = {
  handleSubmit: (
    prevState: {
      success: boolean;
      error: boolean;
      message: string;
      redirectUrl: string;
    },
    formData: FormData,
  ) => Promise<{
    success: boolean;
    error: boolean;
    message: string;
    redirectUrl: string;
  }>;
  title: string;
  subTitle: string;
  thumbnailUrl: string;
  submitBtnName: string;
  slug: string;
  isPrivate: boolean;
};

export default function PostForm({
  handleSubmit,
  title,
  subTitle,
  thumbnailUrl,
  submitBtnName,
  slug,
  isPrivate,
}: Props) {
  const router = useRouter();
  const [formState, formAction] = useFormState(handleSubmit, {
    success: false,
    error: false,
    message: "",
    redirectUrl: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    if (formState.success) {
      toast(<Success message={formState.message} />);
      router.replace(formState.redirectUrl);
    }
    if (formState.error) {
      toast(<Error message={formState.message} />);
    }
  }, [formState, router, toast]);

  // action 속성을 갖고있는 폼 태그 내부안의 컴포넌트에서 useFormStatus를 사용하면 form의 action 상태를 알 수 있다.
  return (
    <>
      <form
        action={formAction}
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
        <span {...stylex.props(styles.slugLabel)}>URL 설정</span>
        <SlugInput
          slug={slug}
          style={styles.defaultInput}
          disabled={slug !== ""}
        />
        <ThumbnailInput
          thumbnailUrl={thumbnailUrl}
          style={styles.defaultFileInput}
        />
        <ImageInput />
        <ContentTextarea style={styles.defaultInput} />
        <div {...stylex.props(styles.container)}>
          <PrivateCheckBoxInput isPrivate={isPrivate} />
          <SubmitButton name={submitBtnName} />
        </div>
      </form>
    </>
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
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "var(--text200)",
    color: "var(--font)",
  },
  defaultFileInput: {
    display: "none",
  },
  slugLabel: {
    color: "var(--font)",
  },
  container: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "30px",
  },
});
