import { redirect } from "next/navigation";
import { PostsService } from "../api/_lib/posts/service";

async function handlePostSubmit(formData: FormData) {
  "use server";
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();
  const slug = formData.get("slug")?.toString();
  if (title && content && slug) {
    await PostsService.createdPost({ title, content, slug });
  }
  redirect("/");
}

export default async function WritePage() {
  return (
    <div>
      <form action={handlePostSubmit}>
        <input name="title" />
        <input name="content" />
        <input name="slug" />
        <button type="submit">글 작성</button>
      </form>
    </div>
  );
}
