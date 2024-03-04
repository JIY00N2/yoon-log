import { PostsService } from "@/app/_lib/posts/service";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await PostsService.getPost(params.slug);

  if (!post) {
    return {
      title: "글을 찾을 수 없습니다.",
    };
  }

  return {
    title: `${post.title} 글 수정`,
    description: `${post.title} 글 수정 페이지입니다.`,
    openGraph: {
      images: post.thumbnailUrl,
    },
  };
}

export default function PostEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
