import { PostsService } from "@/app/_lib/posts/service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await PostsService.getPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
