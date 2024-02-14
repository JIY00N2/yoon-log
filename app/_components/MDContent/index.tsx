"use client";
import MDEditor from "@uiw/react-md-editor";

export default function MDContent({ source }: { source: string }) {
  return (
    <div data-color-mode="light">
      <MDEditor.Markdown source={source} />
    </div>
  );
}
