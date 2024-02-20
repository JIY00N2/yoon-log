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
      <div {...stylex.props(styles.box)}>
        <label
          htmlFor="password"
          {...stylex.props(styles.label)}
        >
          관리자 로그인
        </label>
        <span {...stylex.props(styles.text)}>
          글을 작성하거나 수정할 수 있는 권한은 관리자만 가능합니다.
        </span>
      </div>
      <div {...stylex.props(styles.box)}>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요.."
          {...stylex.props(styles.input)}
        />
        {formState.error && (
          <span {...stylex.props(styles.error)}>{formState.message}</span>
        )}
      </div>
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
  box: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontSize: "1.2rem",
    fontWeight: 700,
  },
  text: {
    color: "rgba(0, 12, 30, 0.8)",
  },
  error: {
    fontSize: "0.8rem",
    color: "red",
  },
  input: {
    width: "40%",
    minHeight: "20px",
    padding: "1rem",
    borderRadius: "1rem",
  },
});