import { redirect } from "next/navigation";
import { PostsService } from "../api/_lib/posts/service";

async function handlePostSubmit(formData: FormData) {
  "use server";
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();
  if (title && content) {
    await PostsService.createdPost({ title, content });
  }
  redirect("/");
}

export default async function WritePage() {
  return (
    <div>
      <form action={handlePostSubmit}>
        <input name="title" />
        <input name="content" />
        <button type="submit">글 작성</button>
      </form>
    </div>
  );
}
