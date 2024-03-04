"use client";

import stylex from "@stylexjs/stylex";
import { MouseEvent, useEffect, useState } from "react";

const INDENT_MAP: { [key in string]: number } = {
  H1: 0,
  H2: 10,
  H3: 20,
};

export default function SideBar() {
  const [hTags, setHTags] = useState<{ headingId: string; indent: number }[]>(
    [],
  );
  const [activeAnchor, setActiveAnchor] = useState<number | null>(null);

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

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const hTagId = decodeURI(hash.slice(1));
      const id = hTags.findIndex((h) => h.headingId === hTagId);
      setActiveAnchor(id);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [hTags]);

  return (
    <div {...stylex.props(styles.sidebar)}>
      <ul {...stylex.props(hTags.length ? styles.ul : styles.hidden)}>
        {hTags.map(({ headingId, indent }, id) => (
          <a
            href={`#${headingId}`}
            key={id}
            {...stylex.props(
              styles.a(`${indent}px`),
              id === activeAnchor && styles.active,
            )}
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
    left: "calc(50vw + 350px + 4rem)",
    paddingTop: "190px",
    height: "100vh",
  },
  ul: {
    display: "flex",
    flexDirection: "column",
    width: "250px",
    paddingHorizontal: "1rem",
    paddingVertical: "0.5rem",
    borderLeftWidth: "2px",
    borderLeftColor: "var(--text100)",
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
  a: (marginLeft: string) => ({
    color: {
      default: "var(--text300)",
      ":hover": "var(--font)",
    },
    fontSize: "0.9rem",
    wordWrap: "break-word",
    transition: "transform 0.125s ease-in-out",
    transform: {
      default: "none",
      ":hover": "scale(1.025)",
    },
    marginLeft,
  }),
  active: {
    color: "var(--font)",
    transition: "transform 0.125s ease-in-out",
    transform: "scale(1.05)",
  },
});
