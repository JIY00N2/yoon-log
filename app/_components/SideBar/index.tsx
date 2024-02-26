"use client";

import stylex from "@stylexjs/stylex";
import { useEffect, useState } from "react";

const INDENT_MAP: { [key in string]: number } = {
  H1: 0,
  H2: 10,
  H3: 20,
};

export default function SideBar() {
  const [hTags, setHTags] = useState<{ headingId: string; indent: number }[]>(
    [],
  );

  useEffect(() => {
    const headings = document.querySelectorAll("h1, h2, h3");
    const newHTag: { headingId: string; indent: number }[] = [];
    headings.forEach((h) => {
      const headingId = h.getAttribute("id");
      if (headingId && h.tagName in INDENT_MAP) {
        newHTag.push({ headingId, indent: INDENT_MAP[h.tagName] });
      }
    });
    setHTags(newHTag);
  }, []);

  return (
    <div {...stylex.props(styles.sidebar)}>
      <ul {...stylex.props(hTags.length ? styles.ul : styles.hidden)}>
        {hTags.map(({ headingId, indent }) => (
          <a
            key={headingId}
            href={`#${headingId}`}
            {...stylex.props(styles.link(`${indent}px`))}
          >
            {headingId}
          </a>
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
    position: "fixed",
    top: 0,
    left: "calc(50vw + 350px)",
    paddingTop: "190px",
    height: "100vh",
  },
  ul: {
    display: "flex",
    flexDirection: "column",
    width: "250px",
    marginLeft: "4rem",
    paddingHorizontal: "1rem",
    paddingVertical: "0.5rem",
    borderLeftWidth: "2px",
    borderLeftColor: "rgba(0, 27, 55, 0.1)",
    borderLeftStyle: "solid",
    gap: "0.3rem",
    minHeight: "150px",
    height: "calc(100vh - 320px)",
    overflowY: "scroll",
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
  hidden: {
    display: "none",
  },
  link: (marginLeft: string) => ({
    color: "rgba(0,19,43,.58)",
    fontSize: "0.9rem",
    wordWrap: "break-word",
    marginLeft,
  }),
});
