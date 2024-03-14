import { Metadata } from "next";
import stylex from "@stylexjs/stylex";

const TITLE = "소개";
const DESCRIPTION = "프런트엔드 개발자 이지윤입니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div {...stylex.props(styles.layout)}>{children}</div>;
}

const styles = stylex.create({
  layout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginHorizontal: "auto",
  },
});
