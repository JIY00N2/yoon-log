"use client";

import Link from "next/link";
import { PropsWithChildren } from "react";
import stylex from "@stylexjs/stylex";
import { useCookies } from "react-cookie";
import ClientBoundary from "./_components/ClientBoundary";

type PostLinkProps = PropsWithChildren<{
  isPrivate: boolean;
  slug: string;
}>;

export default function PostLink({ children, isPrivate, slug }: PostLinkProps) {
  const [{ isLogin }] = useCookies(["isLogin"]);

  if (!isLogin && isPrivate) {
    return <div {...stylex.props(styles.link, styles.secret)}>{children}</div>;
  }

  return (
    <ClientBoundary
      fallback={
        <div {...stylex.props(styles.link, styles.secret)}>{children}</div>
      }
    >
      <Link
        href={`/posts/${slug}`}
        rel="preload"
        {...stylex.props(styles.link)}
      >
        {children}
      </Link>
    </ClientBoundary>
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
