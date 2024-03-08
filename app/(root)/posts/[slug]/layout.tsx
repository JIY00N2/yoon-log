import { PostsService } from "@/app/_lib/posts/service";

const NO_TITLE = "글을 찾을 수 없습니다.";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await PostsService.getPost(decodeURI(params.slug));

  if (!post) {
    return {
      title: NO_TITLE,
    };
  }

  return {
    title: post.title,
    description: post.subTitle,
    openGraph: {
      title: post.title,
      description: post.subTitle,
      images: post.thumbnailUrl,
    },
    alternates: {
      canonical: `/posts/${post.slug}`,
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
