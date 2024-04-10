"use client";

import stylex from "@stylexjs/stylex";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

export default function CommentInput() {
  const { pending } = useFormStatus();
  const [text, setText] = useState("");

  useEffect(() => {
    if (pending) {
      setText("");
    }
  }, [pending]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <input
      name="comment"
      onChange={handleChange}
      value={text}
    />
  );
}

const styles = stylex.create({});
