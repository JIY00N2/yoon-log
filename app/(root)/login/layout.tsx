import { Metadata } from "next";

const TITLE = "관리자 로그인";
const DESCRIPTION = "관리자 로그인 페이지입니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: "/images/yoon-log.jpg",
  },
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
