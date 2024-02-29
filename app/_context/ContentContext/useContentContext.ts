import { useContext } from "react";
import { ContentContext } from ".";

export default function useContentContext() {
  const state = useContext(ContentContext);

  if (state === null) {
    throw Error("Cannot find ContentProvider");
  }

  return state;
}
