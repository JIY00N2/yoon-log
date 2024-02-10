import generateSlug from "@/app/_utils/generateSlug";
import { PostsService } from "@/app/api/_lib/posts/service";
import { redirect } from "next/navigation";

export default function PostEditPage({ params }: { params: { slug: string } }) {
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

  return (
    <form action={handlePostUpdate}>
      <input name="title" />
      <input name="subTitle" />
      <input name="content" />
      <button type="submit">수정 완료</button>
    </form>
  );
}
