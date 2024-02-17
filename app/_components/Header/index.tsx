import stylex from "@stylexjs/stylex";
import LoginButton from "./LoginButton";
import Link from "next/link";
import { colors, fonts } from "@/app/tokens.stylex";
import { navbar } from "./navbar";

export default function Header() {
  return (
    <header {...stylex.props(styles.header)}>
      <div {...stylex.props(styles.headerInner)}>
        <Link
          href="/"
          {...stylex.props(fonts.l)}
        >
          YoonLog
        </Link>
        <nav {...stylex.props(styles.nav)}>
          <ul {...stylex.props(styles.ul)}>
            {navbar.map(({ href, text }, id) => (
              <Link
                href={href}
                key={id}
                {...stylex.props(styles.link)}
              >
                {text}
              </Link>
            ))}
          </ul>
          <LoginButton styleProps={styles.login} />
        </nav>
      </div>
    </header>
  );
}

const styles = stylex.create({
  header: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    minWidth: "1000px",
    height: "60px",
    position: "fixed",
    top: 0,
    borderBottomColor: colors.greyOpacity200,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    backgroundColor: "inherit",
  },
  headerInner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    marginRight: "165px",
    marginLeft: "165px",
  },
  nav: {
    display: "flex",
    gap: "2rem",
  },
  ul: {
    display: "flex",
    gap: "1.5rem",
  },
  link: {
    padding: "5px 10px 5px 10px",
    borderRadius: "5px",
    backgroundColor: {
      ":hover": colors.greyOpacity100,
    },
    color: {
      ":focus": colors.point,
      ":active": colors.point,
    },
  },
  login: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
