import { NextRequest, NextResponse } from "next/server";
import { PostsService } from "../_lib/posts/service";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    if (title && content) {
      const post = await PostsService.createdPost({ title, content });
      return NextResponse.json(post);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
