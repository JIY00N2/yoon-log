"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import stylex, { StyleXStyles } from "@stylexjs/stylex";
import { useCookies } from "react-cookie";

export default function LoginButton({ style }: { style: StyleXStyles }) {
  const pathname = usePathname();
  const router = useRouter();
  const [cookies] = useCookies(["isLogin"]);

  if (pathname === "/login") {
    return null;
  }

  async function handleLogoutClick() {
    await fetch("/api/admin/logout", {
      method: "POST",
    });
    router.replace("/");
    router.refresh();
  }

  return (
    <div {...stylex.props(style)}>
      {cookies.isLogin ? (
        <div {...stylex.props(styles.adminBtn)}>
          <Link href="/write">새 글 작성</Link>
          <button onClick={handleLogoutClick}>로그아웃</button>
        </div>
      ) : (
        <Link href={`/login?redirect=${pathname}`}>관리자</Link>
      )}
    </div>
  );
}

const styles = stylex.create({
  adminBtn: {
    display: "flex",
    gap: "2rem",
  },
  logoutBtn: {},
});
