import { Metadata } from "next";

const TITLE = "새 글 작성";
const DESCRIPTION = "새 글 작성 페이지입니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: "/write",
  },
};

export default function WriteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
