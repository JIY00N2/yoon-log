import { PostsService } from "@/app/_lib/posts/service";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    await PostsService.deletePost(params.slug);
    return NextResponse.json({ message: "Post successfully deleted!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
