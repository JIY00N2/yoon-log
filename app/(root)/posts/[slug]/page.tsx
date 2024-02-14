import AdminButton from "@/app/_components/AdminButton";
import MDContent from "@/app/_components/MDContent";
import { PostsService } from "@/app/_lib/posts/service";
import formattedDate from "@/app/_utils/formattedDate";

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
          <div>createdAt: {formattedDate(post.createdAt)}</div>
          <MDContent source={post.content} />
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
