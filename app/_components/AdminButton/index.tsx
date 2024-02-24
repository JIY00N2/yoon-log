"use client";
import Link from "next/link";
import stylex from "@stylexjs/stylex";
import ClientBoundary from "../ClientBoundary";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function AdminButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [cookies] = useCookies(["isLogin"]);

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
      router.replace("/");
      router.refresh();
    } else {
      console.log(home.message, post.message);
      // TODO: 토스트 ui
    }
  }

  return (
    <ClientBoundary>
      {cookies.isLogin && (
        <div {...stylex.props(styles.container)}>
          <Link href={`/posts/${decodeURI(slug)}/edit`}>수정</Link>
          <button onClick={handleDeleteClick}>삭제</button>
        </div>
      )}
    </ClientBoundary>
  );
}

const styles = stylex.create({
  container: {
    display: "flex",
    gap: "1rem",
  },
});
