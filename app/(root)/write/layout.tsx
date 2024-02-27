import { Metadata } from "next";

export const metadata: Metadata = {
  title: "새 글 작성",
  description: "새 글 작성 페이지입니다.",
};

export default function WriteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
