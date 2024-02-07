import { Metadata } from "next";
import "./globals.css";
import LoginButton from "./_components/LoginButton";

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
    <html lang="ko">
      <body>
        <LoginButton />
        {children}
      </body>
    </html>
  );
}
