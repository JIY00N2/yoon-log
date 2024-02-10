import { PostsService } from "@/app/api/_lib/posts/service";
import AdminButton from "@/app/_components/AdminButton";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await PostsService.getPost(decodeURIComponent(params.slug));

  return (
    <div>
      <AdminButton slug={params.slug} />
      {post ? (
        <div>
          <div>{post.title}</div>
          <div>{post.content}</div>
          <div>{post.createdAt.toLocaleString()}</div>
        </div>
      ) : (
        <div>없음</div>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await PostsService.getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
