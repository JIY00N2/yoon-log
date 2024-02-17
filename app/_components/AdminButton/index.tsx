"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import stylex from "@stylexjs/stylex";
import ClientBoundary from "../ClientBoundary";
import isLoggedIn from "@/app/_utils/isLoggedIn";

export default function AdminButton({ slug }: { slug: string }) {
  const router = useRouter();

  async function handleDeleteClick() {
    await fetch(`/api/posts/${slug}`, {
      method: "DELETE",
    });
    router.replace("/");
    router.refresh();
  }

  return (
    <ClientBoundary>
      {isLoggedIn() && (
        <div {...stylex.props(styles.container)}>
          <Link href={`/posts/${slug}/edit`}>수정</Link>
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
