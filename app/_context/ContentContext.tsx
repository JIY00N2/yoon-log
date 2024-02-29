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
  newContent: string;
  setNewContent: Dispatch<SetStateAction<string>>;
  isImageUploading: boolean;
  setIsImageUploading: Dispatch<SetStateAction<boolean>>;
};
export const ContentContext = createContext<ContentContextState | null>(null);

export const ContentProvider = ({
  content,
  children,
}: PropsWithChildren<{ content: string }>) => {
  const [newContent, setNewContent] = useState(content);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const value = useMemo(
    () => ({
      newContent,
      setNewContent,
      isImageUploading,
      setIsImageUploading,
    }),
    [newContent, isImageUploading],
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
