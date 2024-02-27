import { PostsService } from "@/app/_lib/posts/service";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await PostsService.getPost(decodeURI(params.slug));

  if (!post) {
    return {
      title: "글을 찾을 수 없습니다.",
    };
  }

  return {
    title: post.title,
    description: post.subTitle,
    openGraph: {
      images: post.thumbnailUrl,
    },
  };
}

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
