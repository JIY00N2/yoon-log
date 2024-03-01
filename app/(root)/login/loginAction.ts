"use server";

import { compare, hash } from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function loginAction(
  prevState: {
    success: boolean;
    error: boolean;
    message: string;
  },
  formData: FormData,
) {
  const inputPW = formData.get("password")?.toString();
  const saltRounds = parseInt(process.env.SALT_ROUNDS!);
  const hashedPW = await hash(process.env.PASSWORD!, saltRounds);
  if (inputPW) {
    const isAdmin = await compare(inputPW, hashedPW);
    if (isAdmin) {
      const alg = "HS256";
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const jwtToken = await new SignJWT({ username: "admin" })
        .setProtectedHeader({ alg })
        .setExpirationTime("24h")
        .sign(secret);
      cookies().set("isLogin", "true");
      cookies().set("jwt", jwtToken, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24,
      });
      return {
        success: true,
        error: false,
        message: "로그인 성공!",
      };
    } else {
      return {
        success: false,
        error: true,
        message: "비밀번호가 일치하지 않습니다.",
      };
    }
  }
  return {
    success: false,
    error: true,
    message: "비밀번호를 입력해주세요!",
  };
}
