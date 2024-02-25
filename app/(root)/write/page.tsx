import { PostsService } from "@/app/_lib/posts/service";
import PostForm from "@/app/_components/PostForm";
import { ContentProvider } from "@/app/_context/ContentContext";
import { revalidatePath } from "next/cache";
import generateFilteredSlug from "@/app/_utils/generateFilteredSlug";

async function handlePostSubmit(
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
  const slug = formData.get("slug")?.toString();
  if (title && subTitle && thumbnailUrl && content && slug) {
    await PostsService.createPost({
      title,
      subTitle,
      thumbnailUrl,
      content,
      slug: generateFilteredSlug(slug),
    });
    revalidatePath("/");
    return {
      success: true,
      error: false,
      message: "포스트 생성 성공",
      redirectUrl: "/",
    };
  }
  return {
    success: false,
    error: true,
    message: "포스트 생성 실패",
    redirectUrl: "/",
  };
}

export default async function WritePage() {
  return (
    <ContentProvider content={""}>
      <PostForm
        handleSubmit={handlePostSubmit}
        submitBtnName={"글 작성"}
        title={""}
        subTitle={""}
        thumbnailUrl={""}
        slug={""}
      />
    </ContentProvider>
  );
}
