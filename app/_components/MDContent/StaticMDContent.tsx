"use client";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useEffect } from "react";
import stylex from "@stylexjs/stylex";
import Markdown from "@uiw/react-markdown-preview";
import useTheme from "@/app/_context/ThemeContext/useTheme";

type Props = {
  source: string;
  onLoad?: VoidFunction;
};

export default function StaticMDContent({ source, onLoad }: Props) {
  const { isDarkMode } = useTheme();
  // MDContent가 마운트되면 onLoad 함수를 실행한다.
  useEffect(() => {
    onLoad?.();
  }, [onLoad]);

  return (
    <div
      data-color-mode={isDarkMode ? "dark" : "light"}
      {...stylex.props(styles.layout)}
    >
      <Markdown
        source={source}
        style={{ backgroundColor: "var(--backGround)" }}
      />
    </div>
  );
}

const styles = stylex.create({
  layout: {
    width: "100%",
  },
});
