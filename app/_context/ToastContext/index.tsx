"use client";

import stylex, { StyleXStyles } from "@stylexjs/stylex";
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

type ToastOptions = {
  duration?: number;
  toastStyles?: StyleXStyles;
};

type ToastContextState = {
  toast: (element: ReactNode, options?: ToastOptions) => string;
  close: (id: string) => void;
};

export const ToastContext = createContext<ToastContextState | null>(null);

type Props = {
  defaultDuration?: number;
  containerStyles?: StyleXStyles;
};

type ToastMap = {
  element: ReactNode;
  containerStyles?: StyleXStyles;
  toastStyles?: StyleXStyles;
};

export const ToastProvider = ({
  children,
  defaultDuration = 1000,
  containerStyles = {},
}: PropsWithChildren<Props>) => {
  const [toasts, setToasts] = useState<Map<string, ToastMap>>(new Map());
  const idRef = useRef(0);

  const close = useCallback((id: string) => {
    setToasts((prev) => {
      const cloned = new Map(prev);
      cloned.delete(id);
      return cloned;
    });
  }, []);

  const toast = useCallback(
    (element: ReactNode, options: ToastOptions = {}) => {
      idRef.current += 1;
      const id = idRef.current.toString();
      const { duration = defaultDuration, toastStyles = {} } = options;
      setToasts((prev) => {
        const cloned = new Map(prev);
        cloned.set(id, { element, toastStyles });
        return cloned;
      });
      setTimeout(() => close(id), duration);
      return id;
    },
    [close, defaultDuration],
  );

  const value = useMemo(() => ({ toast, close }), [toast, close]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div {...stylex.props(styles.defaultContainer, containerStyles)}>
        {[...toasts.entries()].map(([id, { element, toastStyles }]) => (
          <div
            key={id}
            {...stylex.props(styles.defaultToast, toastStyles)}
          >
            {element}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const styles = stylex.create({
  defaultContainer: {
    position: "fixed",
    top: 0,
    left: "50vw",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column-reverse",
    padding: "5px",
    gap: "5px",
  },
  defaultToast: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 5px gray",
    transform: "translate(-50%)",
  },
});
