import { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import stylex from "@stylexjs/stylex";

export const metadata: Metadata = {
  title: "Yoon's log",
  description: "Yoon's dev log",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      {...stylex.props(styles.reset)}
    >
      <body {...stylex.props(styles.reset, styles.body)}>
        <main {...stylex.props(styles.main)}>
          <div {...stylex.props(styles.mainInner)}>{children}</div>
        </main>
        <Header />
        <Footer />
      </body>
    </html>
  );
}

const MEDIA_MOBILE = "@media (max-width: 700px)" as const;
const MEDIA_TABLET =
  "@media (min-width: 701px) and (max-width: 1100px)" as const;

const styles = stylex.create({
  reset: {
    margin: 0,
    padding: 0,
  },
  body: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#fff",
    overflowX: "hidden",
  },
  main: {
    display: "flex",
    flexGrow: 1,
    width: "100%",
    minWidth: "320px",
    maxWidth: "1240px",
    marginHorizontal: "auto",
    marginTop: "100px",
    marginBottom: "50px",
    justifyContent: "center",
    alignItems: "center",
  },
  mainInner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginHorizontal: "30px",
    minWidth: "320px",
  },
});
