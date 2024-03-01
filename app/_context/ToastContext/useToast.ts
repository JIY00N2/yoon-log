import { useContext } from "react";
import { ToastContext } from ".";

export default function useToast() {
  const context = useContext(ToastContext);

  if (context === null) {
    throw Error("Cannot find ToastProvider");
  }

  return context;
}
