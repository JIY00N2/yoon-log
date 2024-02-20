import stylex from "@stylexjs/stylex";
import LoginButton from "./LoginButton";
import Link from "next/link";
import { navbar } from "./navbar";
import ClientBoundary from "../ClientBoundary";

export default function Header() {
  return (
    <header {...stylex.props(styles.header)}>
      <div {...stylex.props(styles.headerOuter)}>
        <div {...stylex.props(styles.headerInner)}>
          <Link
            href="/"
            {...stylex.props(styles.logo)}
          >
            YoonLog
          </Link>
          <ClientBoundary fallback={null}>
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
              <LoginButton style={styles.login} />
            </nav>
          </ClientBoundary>
        </div>
      </div>
    </header>
  );
}

const styles = stylex.create({
  header: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "60px",
    position: "fixed",
    top: 0,
    borderBottomColor: "rgba(0, 29, 54, 0.31)",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    backgroundColor: "inherit",
  },
  headerOuter: {
    display: "flex",
    width: "100%",
    minWidth: "320px",
    maxWidth: "1240px",
    height: "100%",
    marginHorizontal: "auto",
  },
  headerInner: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: "30px",
  },
  logo: {
    fontSize: "1.4rem",
    fontWeight: 600,
    color: "rgb(3, 152, 178)",
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
      ":hover": "rgba(2, 32, 71, 0.05)",
    },
    color: {
      ":focus": "rgb(3, 152, 178)",
      ":active": "rgb(3, 152, 178)",
    },
  },
  login: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
