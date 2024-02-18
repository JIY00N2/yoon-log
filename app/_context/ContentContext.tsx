"use client";

import { Props } from "next/script";
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
  newContent: string;
  setNewContent: Dispatch<SetStateAction<string>>;
  isCompletedUploading: boolean;
  setIsCompletedUploading: Dispatch<SetStateAction<boolean>>;
};
export const ContentContext = createContext<ContentContextState | null>(null);

export const ContentProvider = ({
  content,
  children,
}: PropsWithChildren<{ content: string }>) => {
  const [newContent, setNewContent] = useState(content);
  const [isCompletedUploading, setIsCompletedUploading] = useState(false);

  const value = useMemo(
    () => ({
      newContent,
      setNewContent,
      isCompletedUploading,
      setIsCompletedUploading,
    }),
    [newContent, isCompletedUploading],
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
