import TabSummary from "@/app/_components/TabSummary";
import stylex from "@stylexjs/stylex";

export default function AboutPage() {
  return (
    <TabSummary
      title={"About"}
      content={"소개입니당"}
    />
  );
}

const styles = stylex.create({});
