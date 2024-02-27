import { Metadata } from "next";

export const metadata: Metadata = {
  title: "이력서",
  description: "이력서 페이지입니다.",
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
