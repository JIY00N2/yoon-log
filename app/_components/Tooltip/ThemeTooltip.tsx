import { Tooltip } from "jiyoon-ds";
import { PropsWithChildren } from "react";
import stylex from "@stylexjs/stylex";

export const ThemeTooltip = ({
  children,
  isDark,
}: PropsWithChildren<{ isDark: boolean }>) => {
  return (
    <Tooltip.Root direction="bottom">
      <Tooltip.Trigger>{children}</Tooltip.Trigger>
      <Tooltip.Content {...stylex.props(styles.content)}>
        {isDark ? "밝은 테마" : "어두운 테마"}
      </Tooltip.Content>
    </Tooltip.Root>
  );
};

const styles = stylex.create({
  content: {
    display: "flex",
    color: "var(--backGround)",
    backgroundColor: "var(--font)",
    fontSize: "12px",
    padding: "2px 5px",
    borderRadius: "5px",
  },
});
