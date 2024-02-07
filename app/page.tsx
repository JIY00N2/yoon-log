import { PostsService } from "./api/_lib/posts/service";

export const revalidate = 30;

export default async function HomePage() {
  const posts = await PostsService.getPosts();

  return (
    <main>
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
