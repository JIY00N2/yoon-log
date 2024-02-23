import stylex from "@stylexjs/stylex";
import { useEffect } from "react";

export default function SideBar() {
  useEffect(() => {
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const ids: string[] = [];
    headings.forEach((h) => {
      const id = h.getAttribute("id");
      if (id) {
        ids.push(id);
      }
    });
    console.log(ids);
  }, []);
  return <div></div>;
}

const styles = stylex.create({});
