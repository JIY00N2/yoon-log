import { compare, hash } from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { redirect: string };
}) {
  async function handleLoginSubmit(formData: FormData) {
    "use server";
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
        redirect(`${searchParams.redirect}`);
      }
    }
  }

  return (
    <div>
      <form action={handleLoginSubmit}>
        <label htmlFor="password">관리자 비밀번호</label>
        <input
          name="password"
          type="password"
        />
        <button type="submit">확인</button>
      </form>
    </div>
  );
}
