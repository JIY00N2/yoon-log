import { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개",
  description: "개발자 이지윤입니다.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
