import { PostsService } from "@/app/_lib/posts/service";

const TITLE = "글 수정";
const NO_TITLE = "글을 찾을 수 없습니다.";
const DESCRIPTION = "글 수정 페이지입니다.";

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
    title: `${post.title} ${TITLE}`,
    description: `${post.subTitle} ${DESCRIPTION}`,
    openGraph: {
      title: `${post.title} ${TITLE}`,
      description: `${post.subTitle} ${DESCRIPTION}`,
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
