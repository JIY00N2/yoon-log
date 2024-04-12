"use client";

import stylex from "@stylexjs/stylex";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";
import useToast from "@/app/_context/ToastContext/useToast";
import { useEffect } from "react";
import { Error, Success } from "../../_components/Toast";
import GuestBookCommentInput from "./GuestBookCommentInput";

type Props = {
  handleSubmit: (
    prevState: {
      success: boolean;
      error: boolean;
      message: string;
    },
    formData: FormData,
  ) => Promise<{
    success: boolean;
    error: boolean;
    message: string;
  }>;
};

export default function GuestBookCommentForm({ handleSubmit }: Props) {
  const { toast } = useToast();
  const [formState, formAction] = useFormState(handleSubmit, {
    success: false,
    error: false,
    message: "",
  });

  useEffect(() => {
    if (formState.success) {
      toast(<Success message={formState.message} />);
    }
    if (formState.error) {
      toast(<Error message={formState.message} />);
    }
  }, [formState, toast]);

  return (
    <form
      action={formAction}
      {...stylex.props(styles.layout)}
    >
      <GuestBookCommentInput />
      <SubmitButton />
    </form>
  );
}

const styles = stylex.create({
  layout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginVertical: "20px",
  },
});
