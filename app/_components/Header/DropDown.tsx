"use client";

import stylex from "@stylexjs/stylex";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavBar from "./NavBar";

export default function DropDown() {
  const [visible, setVisible] = useState(false);
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setVisible(false);
  }, [pathname]);

  useEffect(() => {
    let timerId: number;
    if (toggle) {
      setVisible(true);
    }
    if (!toggle) {
      timerId = window.setTimeout(() => {
        setVisible(false);
      }, 500);
    }

    return () => {
      window.clearTimeout(timerId);
    };
  }, [toggle]);

  const handleClickMenu = () => {
    setToggle(!toggle);
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
      {visible && (
        <NavBar style={toggle ? styles.dropDownOpen : styles.dropDownClose} />
      )}
    </menu>
  );
}

const MEDIA_TABLET =
  "@media (min-width: 701px) and (max-width: 1100px)" as const;
const MEDIA_MOBILE = "@media (max-width: 700px)" as const;

const scaleUp = stylex.keyframes({
  "0%": { opacity: 0, transform: "scaleY(0)" },
  "100%": { opacity: 1, transform: "scaleY(1)" },
});
const scaleDown = stylex.keyframes({
  "0%": { opacity: 1, transform: "scaleY(1)" },
  "100%": { opacity: 0, transform: "scaleY(0)" },
});

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
  dropDownOpen: {
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
    animationName: scaleUp,
    animationDuration: "0.5s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: 1,
    transformOrigin: "center top",
  },
  dropDownClose: {
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
    animationName: scaleDown,
    animationDuration: "0.5s",
    animationTimingFunction: "ease-in-out",
    transformOrigin: "center top",
  },
});
