import Link from "next/link";
import { PostsService } from "./api/_lib/posts/service";

export default async function HomePage() {
  const posts = await PostsService.getPosts();

  return (
    <main>
      <Link href="/login">로그인</Link>
      <Link href="/write">글 작성 페이지로 이동</Link>
      <div>
        {posts ? (
          posts.map((post) => (
            <div key={post._id.toString()}>
              <div>title: {post.title}</div>
              <div>content: {post.content}</div>
            </div>
          ))
        ) : (
          <span>없음</span>
        )}
      </div>
    </main>
  );
}
