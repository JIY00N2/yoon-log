import TabSummary from "@/app/_components/TabSummary";
import stylex from "@stylexjs/stylex";

export default function ResumePage() {
  return (
    <TabSummary
      title={"Resume"}
      content={"이력서입니당"}
    />
  );
}

const styles = stylex.create({});
