import { NextRequest, NextResponse } from "next/server";
import { PostsService } from "../_lib/posts/service";
import generateSlug from "@/app/_utils/generateSlug";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get("title")?.toString();
    const subTitle = formData.get("subTitle")?.toString();
    const content = formData.get("content")?.toString();
    if (title && subTitle && content) {
      const slug = generateSlug(title);
      const post = await PostsService.createdPost({
        title,
        subTitle,
        content,
        slug,
      });
      return NextResponse.json(post);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
