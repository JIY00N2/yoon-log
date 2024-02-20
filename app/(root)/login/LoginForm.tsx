"use client";

import stylex from "@stylexjs/stylex";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  handleLogin: (
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
  redirectUrl: string;
};

export default function LoginForm({ handleLogin, redirectUrl }: Props) {
  const router = useRouter();
  const [formState, formAction] = useFormState(handleLogin, {
    success: false,
    error: false,
    message: "",
  });

  useEffect(() => {
    if (formState.success) {
      router.replace(redirectUrl);
    }
    if (formState.error) {
      // TODO: alert -> Toast ui
      alert(formState.message);
    }
  }, [formState, router, redirectUrl]);

  return (
    <form
      action={formAction}
      {...stylex.props(styles.container)}
    >
      <label
        htmlFor="password"
        {...stylex.props(styles.label)}
      >
        관리자 비밀번호 입력
      </label>
      <input
        id="password"
        name="password"
        type="password"
        {...stylex.props(styles.input)}
      />
      {formState.error && <span>{formState.message}</span>}
      <SubmitButton />
    </form>
  );
}

const styles = stylex.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "60%",
    height: "60%",
    gap: "2rem",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "rgba(0,19,43,.58)",
  },
  label: {
    fontSize: "1.2rem",
    fontWeight: 700,
  },
  input: {
    width: "40%",
    minHeight: "20px",
    padding: "1rem",
    borderRadius: "1rem",
  },
});
