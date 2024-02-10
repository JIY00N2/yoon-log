"use client";

import Link from "next/link";
import ClientBoundary from "../ClientBoundary";
import { usePathname, useRouter } from "next/navigation";
import isLoggedIn from "../../_utils/isLoggedIn";

export default function LoginButton() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/login") {
    return null;
  }

  async function handleClickLogout() {
    await fetch("/api/logout", {
      method: "POST",
    });
    //router.refresh();
    router.replace("/");
  }

  return (
    <ClientBoundary fallback={<a>로그인</a>}>
      {isLoggedIn() ? (
        <>
          <Link href="/write">글 작성</Link>
          <button onClick={handleClickLogout}>로그아웃</button>
        </>
      ) : (
        <Link href={`/login?redirect=${pathname}`}>로그인</Link>
      )}
    </ClientBoundary>
  );
}
