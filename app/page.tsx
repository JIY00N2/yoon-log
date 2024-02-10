import Link from "next/link";
import { PostsService } from "./api/_lib/posts/service";
import formattedDate from "./_utils/formattedDate";

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
              <div>subTitle:{post.subTitle}</div>
              <div>createdAt: {formattedDate(post.createdAt)}</div>
            </Link>
          ))
        ) : (
          <span>없음</span>
        )}
      </div>
    </main>
  );
}
