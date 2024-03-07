import stylex from "@stylexjs/stylex";
import Link from "next/link";
import GithubSvg from "@/public/images/github.svg";

export default function Footer() {
  return (
    <footer {...stylex.props(styles.footer)}>
      <div {...stylex.props(styles.copyright)}>Copyright © 2024 JIYOON2</div>
      <Link
        href="https://github.com/JIY00N2"
        aria-label="github"
        {...stylex.props(styles.copyright)}
      >
        <GithubSvg
          color={"var(--text200)"}
          width={26}
          height={26}
        />
      </Link>
    </footer>
  );
}

const styles = stylex.create({
  footer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "112px",
    gap: "10px",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: "var(--text100)",
  },
  copyright: {
    color: "var(--text200)",
  },
});
