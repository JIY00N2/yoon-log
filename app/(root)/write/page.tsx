import generateSlug from "@/app/_utils/generateSlug";
import { PostsService } from "@/app/_lib/posts/service";
import { redirect } from "next/navigation";
import ImageForm from "./ImageForm";
import PostForm from "@/app/_components/PostForm";
import { ContentProvider } from "@/app/_context/ContentContext";

export async function handlePostSubmit(formData: FormData) {
  "use server";
  const title = formData.get("title")?.toString();
  const subTitle = formData.get("subTitle")?.toString();
  const content = formData.get("content")?.toString();
  if (title && subTitle && content) {
    const slug = generateSlug(title);
    await PostsService.createdPost({
      title,
      subTitle,
      content,
      slug,
    });
  }
  redirect("/");
}

export default async function WritePage() {
  return (
    <ContentProvider>
      <PostForm
        handleSubmit={handlePostSubmit}
        submitBtnText={"글 작성"}
      />
      <ImageForm />
    </ContentProvider>
  );
}
