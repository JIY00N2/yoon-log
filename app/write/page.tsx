import { redirect } from "next/navigation";
import { PostsService } from "../api/_lib/posts/service";
import generateSlug from "../_utils/generateSlug";

async function handlePostSubmit(formData: FormData) {
  "use server";
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();
  if (title && content) {
    const slug = generateSlug(title);
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
        <button type="submit">글 작성</button>
      </form>
    </div>
  );
}
