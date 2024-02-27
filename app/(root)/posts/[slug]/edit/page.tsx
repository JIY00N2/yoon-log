import { PostsService } from "@/app/_lib/posts/service";
import PostForm from "@/app/_components/PostForm";
import { ContentProvider } from "@/app/_context/ContentContext";
import { revalidatePath } from "next/cache";

export default async function PostEditPage({
  params,
}: {
  params: { slug: string };
}) {
  async function handlePostUpdate(
    prevState: {
      success: boolean;
      error: boolean;
      message: string;
      redirectUrl: string;
    },
    formData: FormData,
  ) {
    "use server";
    const title = formData.get("title")?.toString();
    const subTitle = formData.get("subTitle")?.toString();
    const thumbnailUrl = formData.get("thumbnailUrl")?.toString();
    const content = formData.get("content")?.toString();
    const newPost = await PostsService.updatePost(params.slug, {
      title,
      subTitle,
      thumbnailUrl,
      content,
    });
    if (!newPost) {
      return {
        success: false,
        error: true,
        message: "포스트 수정 실패",
        redirectUrl: "/",
      };
    }
    revalidatePath("/");
    revalidatePath(`/posts/${decodeURI(newPost.slug)}`);
    return {
      success: true,
      error: false,
      message: "포스트 수정 성공",
      redirectUrl: `/posts/${newPost.slug}`,
    };
  }

  const post = await PostsService.getPost(params.slug);

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
            slug={post.slug}
          />
        </ContentProvider>
      )}
    </>
  );
}
