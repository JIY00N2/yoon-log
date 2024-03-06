import { Metadata } from "next";

export const metadata: Metadata = {
  title: "관리자 로그인",
  description: "관리자 로그인 페이지입니다.",
  alternates: {
    canonical: "/login",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
