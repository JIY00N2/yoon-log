import { Metadata } from "next";

export const metadata: Metadata = {
  title: "포트폴리오",
  description: "포트폴리오 페이지입니다.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
