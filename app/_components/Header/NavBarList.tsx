import { usePathname } from "next/navigation";

const navbarList = [
  {
    href: "/",
    text: "Post",
  },
  {
    href: "/about",
    text: "About",
  },
  {
    href: "/guestbook",
    text: "방명록",
  },
];

export const AdminNavbarList = () => {
  return [...navbarList, { href: "/write", text: "Write" }];
};

export const UserNavbarList = () => {
  const pathname = usePathname();
  return [
    ...navbarList,
    { href: `/login?redirect=${pathname}`, text: "Admin" },
  ];
};
