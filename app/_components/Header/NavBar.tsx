import stylex, { StyleXStyles } from "@stylexjs/stylex";
import Link from "next/link";
import React from "react";
import { navbarList } from "./navbarList";
import LoginButton from "./LoginButton";

export default function NavBar({ style }: { style?: StyleXStyles }) {
  return (
    <ul {...stylex.props(styles.ul, style)}>
      {navbarList.map(({ href, text }, id) => (
        <Link
          href={href}
          key={id}
          {...stylex.props(styles.link)}
        >
          {text}
        </Link>
      ))}
      <LoginButton style={styles.link} />
    </ul>
  );
}

const MEDIA_TABLET =
  "@media (min-width: 701px) and (max-width: 1100px)" as const;
const MEDIA_MOBILE = "@media (max-width: 700px)" as const;

const styles = stylex.create({
  ul: {
    display: "flex",
    gap: {
      default: "1.5rem",
      [MEDIA_TABLET]: "1.5rem",
      [MEDIA_MOBILE]: "0.2rem",
    },
  },
  link: {
    minWidth: "fit-content",
    width: {
      default: null,
      [MEDIA_TABLET]: null,
      [MEDIA_MOBILE]: "100%",
    },
    paddingVertical: {
      default: "0.2rem",
      [MEDIA_TABLET]: "0.2rem",
      [MEDIA_MOBILE]: "0.5rem",
    },
    paddingHorizontal: {
      default: "0.5rem",
      [MEDIA_TABLET]: "0.5rem ",
      [MEDIA_MOBILE]: 0,
    },
    borderRadius: "0.3rem",
    backgroundColor: {
      default: "inherit",
      ":hover": "rgba(2, 32, 71, 0.05)",
    },
    color: {
      default: "inherit",
      ":focus": "rgb(3, 152, 178)",
      ":active": "rgb(3, 152, 178)",
    },
    textAlign: "center",
  },
});
