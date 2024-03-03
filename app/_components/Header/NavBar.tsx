"use client";

import stylex, { StyleXStyles } from "@stylexjs/stylex";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { navbarList } from "./navbarList";
import LoginButton from "./LoginButton";
import { colors } from "@/app/globalTokens.stylex";
import { usePathname } from "next/navigation";

export default function NavBar({ style }: { style?: StyleXStyles }) {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const activePath = useMemo(() => ["/", "/about", "/resume"], []);

  useEffect(() => {
    const id = activePath.findIndex((path) => path === pathname);
    setActiveLink(id);
  }, [pathname, activePath]);

  return (
    <ul {...stylex.props(styles.ul, style)}>
      {navbarList.map(({ href, text }, id) => (
        <Link
          key={id}
          href={href}
          {...stylex.props(styles.link, id === activeLink && styles.active)}
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
      ":hover": "var(--text500)",
    },
    color: "var(--font)",
    textAlign: "center",
  },
  active: {
    color: colors.point,
  },
});
