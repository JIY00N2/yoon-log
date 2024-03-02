import { useContext } from "react";
import { ThemeContext } from ".";

export default function useTheme() {
  const state = useContext(ThemeContext);

  if (state === null) {
    throw Error("Cannot find ThemeProvider");
  }

  return state;
}
