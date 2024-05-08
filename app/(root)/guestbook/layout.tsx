import { Metadata } from "next";

const TITLE = "익명 방명록";
const DESCRIPTION = "익명 방명록입니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: "/images/guestbook.png",
  },
  alternates: {
    canonical: "/guestbook",
  },
};

export default function GuestBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
