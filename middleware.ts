import { jwtVerify } from "jose";
import { NextResponse, NextRequest } from "next/server";

// 미들웨어가 들어오면 1. 로그인이 필요한지 확인 2. 로그인이 필요하면 유효한 토큰인지 확인 3. 로그인이 필요한데 토큰이 유효하지 않으면 로그인페이지로..
export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get("jwt")?.value;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  try {
    if (!jwt) {
      throw new Error("There is no jwt!");
    }
    await jwtVerify(jwt, secret);
    return NextResponse.next();
  } catch (error) {
    // 토큰이 유효하지 않다. 로그인 안 된 상태
    // 로그인이 필요한 페이지인데 로그인 안하고 요청보낸 것
    if (request.nextUrl.pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }
    return NextResponse.redirect(
      new URL(`/login?redirect=${request.nextUrl.pathname}`, request.url),
      { headers: { "Set-Cookie": "isLogin=false; Path=/" } },
    );
  }
}

export const config = {
  matcher: ["/write", "/posts/:slug/edit", "/api/admin/:path*"],
};
