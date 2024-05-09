"use client";

import stylex, { StyleXStyles } from "@stylexjs/stylex";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { colors } from "@/app/globalTokens.stylex";
import { usePathname } from "next/navigation";
import { useCookies } from "react-cookie";
import LogoutButton from "./LogoutButton";

export default function NavBar({ style }: { style?: StyleXStyles }) {
  const pathname = usePathname();
  const [cookies] = useCookies(["isLogin"]);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <section {...stylex.props(styles.section, style)}>
      <Link
        href={"/"}
        {...stylex.props(styles.link, activeLink === "/" && styles.active)}
      >
        {"Post"}
      </Link>
      <Link
        href={"/about"}
        {...stylex.props(styles.link, activeLink === "/about" && styles.active)}
      >
        {"About"}
      </Link>
      <Link
        href={"/guestbook"}
        {...stylex.props(
          styles.link,
          activeLink === "/guestbook" && styles.active,
        )}
      >
        {"방명록"}
      </Link>
      {cookies.isLogin ? (
        <>
          <Link
            href={"/write"}
            {...stylex.props(
              styles.link,
              activeLink === "/write" && styles.active,
            )}
          >
            {"Write"}
          </Link>
          <LogoutButton style={styles.link} />
        </>
      ) : (
        <Link
          href={`/login?redirect=${pathname}`}
          {...stylex.props(
            styles.link,
            activeLink === "/login" && styles.active,
          )}
        >
          {"Admin"}
        </Link>
      )}
    </section>
  );
}

const MEDIA_TABLET =
  "@media (min-width: 701px) and (max-width: 1100px)" as const;
const MEDIA_MOBILE = "@media (max-width: 700px)" as const;

const styles = stylex.create({
  section: {
    display: "flex",
    gap: {
      default: "1.5rem",
      [MEDIA_TABLET]: "1.5rem",
      [MEDIA_MOBILE]: "0.2rem",
    },
    justifyContent: "center",
    alignItems: "center",
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
