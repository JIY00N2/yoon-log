import { compare, hash } from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import stylex from "@stylexjs/stylex";

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
    <section {...stylex.props(styles.layout)}>
      <form
        action={handleLoginSubmit}
        {...stylex.props(styles.container)}
      >
        <label
          htmlFor="password"
          {...stylex.props(styles.label)}
        >
          관리자 비밀번호 입력
        </label>
        <input
          id="password"
          name="password"
          type="password"
          {...stylex.props(styles.input)}
        />
        <button
          type="submit"
          {...stylex.props(styles.button)}
        >
          확인
        </button>
      </form>
    </section>
  );
}

const styles = stylex.create({
  layout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "auto",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "60%",
    height: "60%",
    gap: "2rem",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "rgba(0,19,43,.58)",
  },
  label: {
    fontSize: "1.2rem",
    fontWeight: 700,
  },
  input: {
    width: "40%",
    minHeight: "20px",
    padding: "1rem",
    borderRadius: "1rem",
  },
  button: {
    borderRadius: "0.5rem",
    padding: "0.5rem 1rem 0.5rem 1rem",
    backgroundColor: "rgba(2, 32, 71, 0.05)",
    fontSize: "0.9rem",
    fontWeight: 700,
  },
});
