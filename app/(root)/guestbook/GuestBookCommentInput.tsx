"use client";

import stylex from "@stylexjs/stylex";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

export default function GuestBookCommentInput() {
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
      {...stylex.props(styles.input)}
    />
  );
}

const styles = stylex.create({
  input: {
    width: "600px",
    height: "35px",
    borderRadius: "10px",
    paddingHorizontal: "10px",
    borderColor: "black",
    borderWidth: "1px",
    borderStyle: "solid",
  },
});
