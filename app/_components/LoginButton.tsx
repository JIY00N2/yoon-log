"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import ClientBoundary from "./ClientBoundary";

export default function LoginButton() {
  const isLogin = Cookies.get("isLogin") === "true";

  return (
    <ClientBoundary fallback={<a>로그인</a>}>
      {isLogin ? (
        <>
          <Link href="/write">글 작성</Link>
        </>
      ) : (
        <Link href="/login">로그인</Link>
      )}
    </ClientBoundary>
  );
}
