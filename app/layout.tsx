import { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import stylex from "@stylexjs/stylex";
import ScrollToHash from "./_components/ScrollToHash";
import { ToastProvider } from "./_context/ToastContext";
import { ThemeProvider } from "./_context/ThemeContext";
import { BASE_URL } from "./_constants";

const TITLE = "Yoon Log";
const DESCRIPTION = "Yoon's dev log";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: "/images/yoon-log.jpg",
  },
  alternates: {
    canonical: "/",
  },
};

const themeInitializerScript = `
  const theme = localStorage.getItem("theme");
  document.documentElement.setAttribute("data-theme", theme);
  `;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      {...stylex.props(styles.html)}
    >
      <head>
        <meta
          name="google-site-verification"
          content={process.env.GOOGLE_SITE_VERIFICATION!}
        />
        <meta
          name="naver-site-verification"
          content={process.env.NAVER_SITE_VERIFICATION!}
        />
      </head>
      <ThemeProvider>
        <body {...stylex.props(styles.body)}>
          <script
            dangerouslySetInnerHTML={{ __html: themeInitializerScript }}
          />
          <ToastProvider defaultDuration={1000}>
            <main {...stylex.props(styles.main)}>
              <div {...stylex.props(styles.mainInner)}>
                <ScrollToHash offset={70} />
                {children}
              </div>
            </main>
            <Header />
            <Footer />
          </ToastProvider>
        </body>
      </ThemeProvider>
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
    marginBottom: "40px",
  },
  mainInner: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: "30px",
    minWidth: "320px",
  },
});
