import { PostsService } from "@/app/_lib/posts/service";
import generateSlug from "@/app/_utils/generateSlug";
import PostForm from "@/app/_components/PostForm";
import { ContentProvider } from "@/app/_context/ContentContext";
import { revalidatePath } from "next/cache";

export default async function PostEditPage({
  params,
}: {
  params: { slug: string };
}) {
  async function handlePostUpdate(
    prevState: { success: boolean },
    formData: FormData,
  ) {
    "use server";
    const title = formData.get("title")?.toString();
    const subTitle = formData.get("subTitle")?.toString();
    const thumbnailUrl = formData.get("thumbnailUrl")?.toString();
    const content = formData.get("content")?.toString();
    let slug = decodeURIComponent(params.slug);
    if (title) {
      slug = generateSlug(title);
    }
    const newPost = await PostsService.updatePost(
      decodeURIComponent(params.slug),
      {
        title,
        subTitle,
        thumbnailUrl,
        content,
        slug,
      },
    );
    if (!newPost) {
      return {
        success: false,
        message: "포스트 수정 실패",
        redirectUrl: "/",
      };
    }
    revalidatePath("/");
    revalidatePath(`/posts/${encodeURIComponent(newPost.slug)}`);
    return {
      success: true,
      message: "포스트 수정 성공",
      redirectUrl: `/posts/${encodeURIComponent(newPost.slug)}`,
    };
  }

  const post = await PostsService.getPost(decodeURIComponent(params.slug));

  return (
    <>
      {post && (
        <ContentProvider content={post.content}>
          <PostForm
            handleSubmit={handlePostUpdate}
            submitBtnName={"수정 완료"}
            title={post.title}
            subTitle={post.subTitle}
            thumbnailUrl={post.thumbnailUrl}
          />
        </ContentProvider>
      )}
    </>
  );
}
