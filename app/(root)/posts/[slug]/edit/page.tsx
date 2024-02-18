import { redirect } from "next/navigation";
import { PostsService } from "@/app/_lib/posts/service";
import generateSlug from "@/app/_utils/generateSlug";
import PostForm from "@/app/_components/PostForm";
import { ContentProvider } from "@/app/_context/ContentContext";

export default async function PostEditPage({
  params,
}: {
  params: { slug: string };
}) {
  async function handlePostUpdate(formData: FormData) {
    "use server";
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const subTitle = formData.get("subTitle")?.toString();
    let slug = decodeURIComponent(params.slug);
    if (title) {
      slug = generateSlug(title);
    }
    const newPost = await PostsService.updatedPost(
      decodeURIComponent(params.slug),
      {
        title,
        subTitle,
        content,
        slug,
      },
    );
    if (!newPost) {
      throw new Error("newPost가 없습니다.");
    }
    redirect(`/posts/${encodeURIComponent(newPost.slug)}`);
  }

  const post = await PostsService.getPost(decodeURIComponent(params.slug));

  return (
    <ContentProvider content={post?.content!}>
      {post && (
        <PostForm
          handleSubmit={handlePostUpdate}
          submitBtnText={"수정 완료"}
          title={post.title}
          subTitle={post.subTitle}
          thumbnailUrl={post.thumbnailUrl}
        />
      )}
    </ContentProvider>
  );
}
