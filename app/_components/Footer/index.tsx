import stylex from "@stylexjs/stylex";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer {...stylex.props(styles.footer)}>
      <div {...stylex.props(styles.copyright)}>Copyright © 2024 JIYOON2</div>
      <Link href="https://github.com/JIY00N2">
        <Image
          src="/images/github.svg"
          alt="github"
          width={25}
          height={25}
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
    borderTopColor: "rgba(0, 27, 55, 0.1)",
  },
  copyright: {
    color: "rgba(0, 29, 54, 0.31)",
  },
});
