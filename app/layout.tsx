import { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import stylex from "@stylexjs/stylex";
import ScrollToHash from "./_components/ScrollToHash";
import { ToastProvider } from "./_context/ToastContext";

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
        <ToastProvider
          defaultDuration={1000}
          containerStyles={toastContainerStyles.custom}
        >
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
    </html>
  );
}

const styles = stylex.create({
  reset: {
    margin: 0,
    padding: 0,
    scrollBehavior: "smooth",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#fff",
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

const toastContainerStyles = stylex.create({
  custom: {},
});
