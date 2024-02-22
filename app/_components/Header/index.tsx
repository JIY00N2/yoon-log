import stylex from "@stylexjs/stylex";
import Link from "next/link";
import ClientBoundary from "../ClientBoundary";
import DropDown from "./DropDown";
import NavBar from "./NavBar";

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
              <NavBar />
            </nav>
            <nav {...stylex.props(styles.navMobile)}>
              <DropDown />
            </nav>
          </ClientBoundary>
        </div>
      </div>
    </header>
  );
}

const MEDIA_TABLET =
  "@media (min-width: 701px) and (max-width: 1100px)" as const;
const MEDIA_MOBILE = "@media (max-width: 700px)" as const;

const styles = stylex.create({
  header: {
    display: "flex",
    alignItems: "center",
    width: "100vw",
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
    minWidth: "320px",
    maxWidth: "1240px",
    height: "100%",
    marginHorizontal: "auto",
  },
  headerInner: {
    display: "flex",
    width: "100vw",
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
    display: {
      default: "flex",
      [MEDIA_TABLET]: "flex",
      [MEDIA_MOBILE]: "none",
    },
  },
  navMobile: {
    display: {
      default: "none",
      [MEDIA_TABLET]: "none",
      [MEDIA_MOBILE]: "flex",
    },
  },
});
