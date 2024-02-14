import { PropsWithChildren } from "react";

type Props = {
  handleSubmit: (formData: FormData) => Promise<void>;
  submitBtnText: string;
};

export default function PostForm({
  handleSubmit,
  submitBtnText,
  children,
}: PropsWithChildren<Props>) {
  return (
    <form action={handleSubmit}>
      <input name="title" />
      <input name="subTitle" />
      <textarea name="content" />
      {children}
      <button type="submit">{submitBtnText}</button>
    </form>
  );
}
