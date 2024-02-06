import { NextResponse } from "next/server";
import { PostsService } from "../_lib/posts/service";

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
