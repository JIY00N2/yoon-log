"use client";

import stylex from "@stylexjs/stylex";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SideBar() {
  const [hTagId, setHTagId] = useState<string[]>([]);

  useEffect(() => {
    const headings = document.querySelectorAll("h1, h2, h3");
    const newHTagIds: string[] = [];
    headings.forEach((h) => {
      const id = h.getAttribute("id");
      if (id) {
        newHTagIds.push(id);
      }
    });
    setHTagId(newHTagIds);
  }, []);

  return (
    <div {...stylex.props(styles.sidebar)}>
      <ul {...stylex.props(hTagId.length ? styles.ul : styles.hidden)}>
        {hTagId.map((id) => (
          <Link
            key={id}
            href={`#${id}`}
            {...stylex.props(styles.link)}
          >
            {id}
          </Link>
        ))}
      </ul>
    </div>
  );
}
const MEDIA_SIDEBAR = "@media (max-width: 1350px)" as const;

const styles = stylex.create({
  sidebar: {
    display: {
      default: "flex",
      [MEDIA_SIDEBAR]: "none",
    },
    position: "absolute",
    top: "-26rem",
    left: "100%",
    marginRight: "5rem",
  },
  ul: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    width: "250px",
    marginLeft: "4rem",
    paddingHorizontal: "1rem",
    paddingVertical: "0.5rem",
    borderLeftWidth: "2px",
    borderLeftColor: "rgba(0, 27, 55, 0.1)",
    borderLeftStyle: "solid",
    gap: "0.3rem",
  },
  hidden: {
    display: "none",
  },
  link: {
    color: "rgba(0,19,43,.58)",
    fontSize: "0.9rem",
    wordWrap: "break-word",
  },
});
