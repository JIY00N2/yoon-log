"use client";
import Link from "next/link";
import stylex from "@stylexjs/stylex";
import ClientBoundary from "../ClientBoundary";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import useToast from "@/app/_context/ToastContext/useToast";
import { Error, Success } from "../Toast";

export default function AdminButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [cookies] = useCookies(["isLogin"]);
  const { toast } = useToast();

  async function handleDeleteClick() {
    await fetch(`/api/admin/posts/${decodeURI(slug)}`, {
      method: "DELETE",
    });
    const [resHome, resPost] = await Promise.all([
      fetch("/api/admin/revalidate?path=/"),
      fetch(`/api/admin/revalidate?path=/posts/${decodeURI(slug)}`),
    ]);
    const home = (await resHome.json()) as {
      revalidated: boolean;
      message?: string;
    };
    const post = (await resPost.json()) as {
      revalidated: boolean;
      message?: string;
    };
    if (home.revalidated && post.revalidated) {
      toast(<Success message="포스트 삭제 성공!" />);
      router.replace("/");
      router.refresh();
    } else {
      toast(
        <Error message={home.message || post.message || "포스트 삭제 실패!"} />,
      );
    }
  }

  return (
    <ClientBoundary>
      {cookies.isLogin && (
        <li {...stylex.props(styles.container)}>
          <Link
            href={`/posts/${decodeURI(slug)}/edit`}
            {...stylex.props(styles.font)}
          >
            수정
          </Link>
          <button
            onClick={handleDeleteClick}
            {...stylex.props(styles.font)}
          >
            삭제
          </button>
        </li>
      )}
    </ClientBoundary>
  );
}

const styles = stylex.create({
  container: {
    display: "flex",
    gap: "1rem",
    listStyleType: "none",
  },
  font: {
    color: "var(--font)",
  },
});
