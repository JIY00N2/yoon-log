import Link from "next/link";
import { PostsService } from "./api/_lib/posts/service";

export const revalidate = 30;

export default async function HomePage() {
  const posts = await PostsService.getPosts();

  return (
    <main>
      <div>
        {posts ? (
          posts.map((post) => (
            <Link
              key={post._id.toString()}
              href={`/posts/${post.slug}`}
            >
              <div>title: {post.title}</div>
              <div>content: {post.content}</div>
              <div>slug: {post.slug}</div>
              <div>createdAt: {post.createdAt.toLocaleString()}</div>
              <div>updatedAt: {post.updatedAt.toLocaleString()}</div>
            </Link>
          ))
        ) : (
          <span>없음</span>
        )}
      </div>
    </main>
  );
}
