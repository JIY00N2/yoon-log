import TabSummary from "@/app/_components/TabSummary";
import stylex from "@stylexjs/stylex";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "개발자 이지윤입니다.",
};

export default function AboutPage() {
  return (
    <TabSummary
      title={"About"}
      content={"소개입니당"}
    />
  );
}

const styles = stylex.create({});
