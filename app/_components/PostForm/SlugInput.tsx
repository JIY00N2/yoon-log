"use client";

import useContentContext from "@/app/_context/ContentContext/useContentContext";
import { colors } from "@/app/globalTokens.stylex";
import stylex, { StyleXStyles } from "@stylexjs/stylex";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

export default function SlugInput({
  slug,
  style,
  disabled = false,
}: {
  slug: string;
  style: StyleXStyles;
  disabled?: boolean;
}) {
  const { isImageUploading } = useContentContext();
  const { pending } = useFormStatus();
  const [prefix, setPrefix] = useState<string>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setPrefix(window.location.origin + "/posts/");
  }, []);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      {...stylex.props(styles.slug, styles.container, style)}
      style={{ pointerEvents: disabled ? "none" : "initial" }}
      onClick={handleContainerClick}
    >
      <span {...stylex.props(styles.prefix)}>{prefix}</span>
      <input
        name="slug"
        defaultValue={slug}
        ref={inputRef}
        disabled={pending || isImageUploading}
        {...stylex.props(styles.slug, styles.input)}
      />
    </div>
  );
}

const styles = stylex.create({
  container: {
    display: "flex",
    width: "100%",
    cursor: "text",
  },
  slug: {
    fontSize: "1rem",
  },
  prefix: {
    color: colors.gray,
  },
  input: {
    width: "100%",
    flexGrow: "1",
    outline: {
      ":active": "none",
      ":focus": "none",
    },
    backgroundColor: "var(--backGround)",
    caretColor: "var(--font)",
    color: "inherit",
  },
});
