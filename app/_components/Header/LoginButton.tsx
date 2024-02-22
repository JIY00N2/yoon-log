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
    <div {...stylex.props(styles.layout)}>
      {cookies.isLogin ? (
        <div {...stylex.props(styles.container)}>
          <Link
            href="/write"
            {...stylex.props(style)}
          >
            새 글 작성
          </Link>
          <button
            onClick={handleLogoutClick}
            {...stylex.props(style)}
          >
            로그아웃
          </button>
        </div>
      ) : (
        <Link
          href={`/login?redirect=${pathname}`}
          {...stylex.props(style)}
        >
          관리자
        </Link>
      )}
    </div>
  );
}

const MEDIA_TABLET =
  "@media (min-width: 701px) and (max-width: 1100px)" as const;
const MEDIA_MOBILE = "@media (max-width: 700px)" as const;

const styles = stylex.create({
  layout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  container: {
    display: "flex",
    width: "100%",
    gap: {
      default: "1.5rem",
      [MEDIA_TABLET]: "1.5rem",
      [MEDIA_MOBILE]: "0.18rem",
    },
    flexDirection: {
      default: "row",
      [MEDIA_TABLET]: "row",
      [MEDIA_MOBILE]: "column",
    },
  },
});
