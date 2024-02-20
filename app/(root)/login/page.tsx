import stylex from "@stylexjs/stylex";
import LoginForm from "./LoginForm";
import { loginAction } from "./loginAction";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { redirect: string };
}) {
  return (
    <section {...stylex.props(styles.layout)}>
      <LoginForm
        redirectUrl={searchParams.redirect}
        handleLogin={loginAction}
      />
    </section>
  );
}

const styles = stylex.create({
  layout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
