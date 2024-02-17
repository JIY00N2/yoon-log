import { jwtVerify } from "jose";
import { NextResponse, NextRequest } from "next/server";

function isLoginRequired(pathname: string) {
  const loginRequiredRoutes = [/\/write/, /\/posts\/[^\/]+\/edit$/];
  for (const route of loginRequiredRoutes) {
    if (pathname.match(route)) {
      return true;
    }
  }
  return false;
}

export async function middleware(request: NextRequest) {
  const response = new NextResponse();
  const jwtToken = request.cookies.get("jwt")?.value;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  try {
    if (!jwtToken) {
      throw new Error("There is no jwtToken!");
    }
    await jwtVerify(jwtToken, secret);
    return NextResponse.next(response);
  } catch (error) {
    // 로그인 안 된 상태
    response.cookies.set("isLogin", "false");
    if (isLoginRequired(request.nextUrl.pathname)) {
      // 로그인이 필요한 페이지인데 로그인 안하고 요청보낸 것
      return NextResponse.redirect(
        new URL(`/login?redirect=${request.nextUrl.pathname}`, request.url),
      );
    }
    return NextResponse.next(response);
  }
}
