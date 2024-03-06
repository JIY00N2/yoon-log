import { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import stylex from "@stylexjs/stylex";
import ScrollToHash from "./_components/ScrollToHash";
import { ToastProvider } from "./_context/ToastContext";
import { ThemeProvider } from "./_context/ThemeContext";

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
      id="html"
    >
      <head>
        <meta
          name="google-site-verification"
          content="a43m2EcNn3YyiwTjKE9g0yDNGaPC7pZIOS3b3tVYN0w"
        />
        <ThemeProvider>
          <body {...stylex.props(styles.body)}>
            <ToastProvider defaultDuration={1000}>
              <main {...stylex.props(styles.main)}>
                <div {...stylex.props(styles.mainInner)}>
                  <ScrollToHash />
                  {children}
                </div>
              </main>
              <Header />
              <Footer />
            </ToastProvider>
          </body>
        </ThemeProvider>
      </head>
    </html>
  );
}

const styles = stylex.create({
  html: {
    scrollBehavior: "smooth",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "var(--backGround)",
    overflowX: "hidden",
  },
  main: {
    flexGrow: 1,
    width: "100%",
    minWidth: "320px",
    maxWidth: "1240px",
    marginHorizontal: "auto",
    marginTop: "100px",
    marginBottom: "150px",
  },
  mainInner: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: "30px",
    minWidth: "320px",
  },
});
