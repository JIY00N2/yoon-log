"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import ClientBoundary from "./ClientBoundary";

export default function LoginButton() {
  const isLogin = Cookies.get("isLogin") === "true";

  async function handleClickLogout() {
    await fetch("/api/logout", {
      method: "POST",
    });
  }

  return (
    <ClientBoundary fallback={<a>로그인</a>}>
      {isLogin ? (
        <>
          <Link href="/write">글 작성</Link>
          <button onClick={handleClickLogout}>로그아웃</button>
        </>
      ) : (
        <Link href="/login">로그인</Link>
      )}
    </ClientBoundary>
  );
}
