import { PostsService } from "@/app/api/_lib/posts/service";
import { redirect } from "next/navigation";

export default function PostEditPage({ params }: { params: { slug: string } }) {
  async function handleUpdatePost(formData: FormData) {
    "use server";
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const slug = formData.get("slug")?.toString();
    const newPost = await PostsService.updatedPost(params.slug, {
      title,
      content,
      slug,
    });
    if (!newPost) {
      throw new Error("need slug value");
    }
    redirect(`/posts/${newPost.slug}`);
  }

  return (
    <form action={handleUpdatePost}>
      <input name="title" />
      <input name="content" />
      <input name="slug" />
      <button type="submit">수정 완료</button>
    </form>
  );
}
