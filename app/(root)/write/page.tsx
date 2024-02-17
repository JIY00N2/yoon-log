import generateSlug from "@/app/_utils/generateSlug";
import { PostsService } from "@/app/_lib/posts/service";
import { redirect } from "next/navigation";
import PostForm from "@/app/_components/PostForm";
import { ContentProvider } from "@/app/_context/ContentContext";
import { revalidatePath } from "next/cache";

async function handlePostSubmit(formData: FormData) {
  "use server";
  const title = formData.get("title")?.toString();
  const subTitle = formData.get("subTitle")?.toString();
  const thumbnailUrl = formData.get("thumbnailUrl")?.toString();
  const content = formData.get("content")?.toString();
  if (title && subTitle && thumbnailUrl && content) {
    const slug = generateSlug(title);
    await PostsService.createdPost({
      title,
      subTitle,
      thumbnailUrl,
      content,
      slug,
    });
  }
  revalidatePath("/");
  redirect("/");
}

export default async function WritePage() {
  return (
    <ContentProvider>
      <PostForm
        handleSubmit={handlePostSubmit}
        submitBtnText={"글 작성"}
      />
    </ContentProvider>
  );
}
