import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const headers = new Headers();
    headers.append("Set-Cookie", "jwt=deleted; Path=/");
    headers.append("Set-Cookie", "isLogin=false; Path=/");
    return NextResponse.json({ message: "logout success" }, { headers });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
