import { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import stylex from "@stylexjs/stylex";

// TODO: 스크롤 탑, 스크롤위치, 사이드바, 다크모드, 토스트ui, drop and drop

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
        <main {...stylex.props(styles.main)}>{children}</main>
        <Header />
        <Footer />
      </body>
    </html>
  );
}

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
  },
  main: {
    display: "flex",
    height: "100%",
    flexGrow: "1",
    margin: "100px 165px 50px 165px",
  },
});
