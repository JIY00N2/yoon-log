"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import stylex, { StyleXStyles } from "@stylexjs/stylex";
import { useCookies } from "react-cookie";
import useToast from "@/app/_context/ToastContext/useToast";
import { Error, Success } from "../Toast";

export default function LoginButton({ style }: { style: StyleXStyles }) {
  const pathname = usePathname();
  const router = useRouter();
  const [cookies] = useCookies(["isLogin"]);
  const { toast } = useToast();

  if (pathname === "/login") {
    return null;
  }

  async function handleLogoutClick() {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });
      toast(<Success message={"로그아웃 성공!"} />);
      router.replace("/");
      router.refresh();
    } catch (error) {
      toast(<Error message={(error as Error).message} />);
    }
  }

  return (
    <div {...stylex.props(styles.layout)}>
      {cookies.isLogin ? (
        <div {...stylex.props(styles.container)}>
          <Link
            href="/write"
            {...stylex.props(style)}
          >
            Write
          </Link>
          <button
            onClick={handleLogoutClick}
            {...stylex.props(style)}
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          href={`/login?redirect=${pathname}`}
          {...stylex.props(style)}
        >
          Admin
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
