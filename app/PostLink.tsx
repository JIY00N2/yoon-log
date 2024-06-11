"use client";

import Link from "next/link";
import { PropsWithChildren } from "react";
import stylex from "@stylexjs/stylex";
import { useCookies } from "react-cookie";

type PostLinkProps = PropsWithChildren<{
  isPrivate: boolean;
  slug: string;
}>;

export default function PostLink({ children, isPrivate, slug }: PostLinkProps) {
  const [{ isLogin }] = useCookies(["isLogin"]);

  if (!isLogin && isPrivate) {
    return <div {...stylex.props(styles.secret)}>{children}</div>;
  }

  return (
    <Link
      href={`/posts/${slug}`}
      rel="preload"
      {...stylex.props(styles.link)}
    >
      {children}
    </Link>
  );
}

const styles = stylex.create({
  link: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    gap: "0.7rem",
  },
  secret: {
    cursor: "not-allowed",
  },
});
