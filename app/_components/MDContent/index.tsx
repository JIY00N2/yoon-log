"use client";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

const Markdown = dynamic(() => import("@uiw/react-markdown-preview"));

export default function MDContent({ source }: { source: string }) {
  return (
    <div data-color-mode="light">
      <Markdown source={source} />
    </div>
  );
}
