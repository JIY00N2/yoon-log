import { NextRequest, NextResponse } from "next/server";
import { PostsService } from "../../_lib/posts/service";

export async function GET({ params }: { params: { id: string } }) {
  try {
    const postId = params.id;
    const post = await PostsService.getPost(postId);
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
  { params }: { params: { id: string } },
) {
  try {
    const postId = params.id;
    const body = await req.json();
    const post = await PostsService.updatedPost(postId, body);
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const postId = params.id;
    await PostsService.deletedPost(postId);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
