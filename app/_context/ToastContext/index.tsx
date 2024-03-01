"use client";

import stylex, { StyleXStyles } from "@stylexjs/stylex";
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
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
  isActive: boolean;
  containerStyles?: StyleXStyles;
  toastStyles?: StyleXStyles;
};

export const ToastProvider = ({
  children,
  defaultDuration = 1000,
  containerStyles = {},
}: PropsWithChildren<Props>) => {
  const idRef = useRef(0);
  const [toasts, setToasts] = useState<Map<string, ToastMap>>(new Map());

  const close = useCallback((id: string) => {
    setToasts((prev) => {
      const cloned = new Map(prev);
      cloned.delete(id);
      return cloned;
    });
  }, []);

  const update = useCallback(
    (id: string, duration: number) => {
      setToasts((prev) => {
        const cloned = new Map(prev);
        const toast = cloned.get(id);
        if (toast) {
          cloned.set(id, {
            ...toast,
            isActive: false,
          });
        }
        return cloned;
      });
      setTimeout(() => close(id), duration - 200);
    },
    [close],
  );

  const toast = useCallback(
    (element: ReactNode, options: ToastOptions = {}) => {
      idRef.current += 1;
      const id = idRef.current.toString();
      const { duration = defaultDuration, toastStyles = {} } = options;
      setToasts((prev) => {
        const cloned = new Map(prev);
        cloned.set(id, {
          element,
          isActive: true,
          toastStyles,
        });
        return cloned;
      });
      setTimeout(() => update(id, duration), duration - 300);
      return id;
    },
    [defaultDuration, update],
  );

  const value = useMemo(
    () => ({ toast, close, update }),
    [toast, close, update],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div {...stylex.props(styles.defaultContainer, containerStyles)}>
        {[...toasts.entries()].map(
          ([id, { element, isActive, toastStyles }]) => (
            <div
              key={id}
              {...stylex.props(
                isActive
                  ? styles.defaultToastFadeIn
                  : styles.defaultToastFadeOut,
                toastStyles,
              )}
            >
              {element}
            </div>
          ),
        )}
      </div>
    </ToastContext.Provider>
  );
};

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -20px)" },
  "100%": { opacity: 1, transform: "translate(-50%, 0)" },
});

const fadeOut = stylex.keyframes({
  "0%": { opacity: 1, transform: "translate(-50%, 0)" },
  "100%": { opacity: 0, transform: "translate(-50%, -20px)" },
});

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
  defaultToastFadeIn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 5px gray",
    transform: "translate(-50%)",
    animationName: fadeIn,
    animationDuration: "0.8s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "1",
  },
  defaultToastFadeOut: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 5px gray",
    transform: "translate(-50%)",
    animationName: fadeOut,
    animationDuration: "0.8s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "1",
  },
});
