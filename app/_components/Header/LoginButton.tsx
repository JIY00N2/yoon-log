"use client";

import Link from "next/link";
import ClientBoundary from "../ClientBoundary";
import { usePathname, useRouter } from "next/navigation";
import isLoggedIn from "../../_utils/isLoggedIn";
import stylex, { StyleXStyles } from "@stylexjs/stylex";

export default function LoginButton({
  styleProps,
}: {
  styleProps: StyleXStyles;
}) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/login") {
    return null;
  }

  async function handleLogoutClick() {
    await fetch("/api/logout", {
      method: "POST",
    });
    //router.refresh();
    router.replace("/");
  }

  return (
    <ClientBoundary fallback={<div>관리자</div>}>
      <div {...stylex.props(styleProps)}>
        {isLoggedIn() ? (
          <div {...stylex.props(styles.adminBtn)}>
            <Link href="/write">새 글 작성</Link>
            <button onClick={handleLogoutClick}>로그아웃</button>
          </div>
        ) : (
          <Link href={`/login?redirect=${pathname}`}>관리자</Link>
        )}
      </div>
    </ClientBoundary>
  );
}

const styles = stylex.create({
  adminBtn: {
    display: "flex",
    gap: "2rem",
  },
  logoutBtn: {},
});
