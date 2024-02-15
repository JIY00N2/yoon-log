"use client";

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

type ContentContextState = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  isCompletedUploading: boolean;
  setIsCompletedUploading: Dispatch<SetStateAction<boolean>>;
};
export const ContentContext = createContext<ContentContextState | null>(null);

export const ContentProvider = ({ children }: PropsWithChildren) => {
  const [content, setContent] = useState("");
  const [isCompletedUploading, setIsCompletedUploading] = useState(false);

  const value = useMemo(
    () => ({
      content,
      setContent,
      isCompletedUploading,
      setIsCompletedUploading,
    }),
    [content, isCompletedUploading],
  );
  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
};

export const useContentContext = () => {
  const state = useContext(ContentContext);
  if (state === null) {
    throw Error("Cannot find ContentProvider");
  }

  return state;
};
