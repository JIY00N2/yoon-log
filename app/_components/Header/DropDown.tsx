"use client";

import stylex from "@stylexjs/stylex";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavBar from "./NavBar";

export default function DropDown() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleClickMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <menu {...stylex.props(styles.menu)}>
      <button
        {...stylex.props(styles.button)}
        onClick={handleClickMenu}
      >
        <Image
          src={"/images/menu.svg"}
          alt="메뉴"
          width={26}
          height={26}
        />
      </button>
      {open && <NavBar style={styles.mobile} />}
    </menu>
  );
}

const MEDIA_TABLET =
  "@media (min-width: 701px) and (max-width: 1100px)" as const;
const MEDIA_MOBILE = "@media (max-width: 700px)" as const;

const styles = stylex.create({
  menu: {
    display: {
      default: "none",
      [MEDIA_TABLET]: "none",
      [MEDIA_MOBILE]: "flex",
    },
    flexDirection: "column",
    position: "relative",
  },
  button: {
    display: "flex",
  },
  mobile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "2rem",
    right: 0,
    width: "140px",
    height: "auto",
    boxShadow: "1px 1px 3px 1px #adb5bd",
    backgroundColor: "#fff",
    borderRadius: "0.5rem",
  },
});
