import { PostsService } from "@/app/_lib/posts/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const post = await PostsService.getPost(params.slug);
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const body = await req.json();
    const post = await PostsService.updatedPost(params.slug, body);
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    await PostsService.deletedPost(params.slug);
    return NextResponse.json({ message: "Post successfully deleted!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
