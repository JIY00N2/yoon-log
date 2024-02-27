import { useCallback, useEffect, useRef, useState } from "react";

export default function useDragAndDrop<T extends HTMLElement>(
  onChange: (e: DragEvent) => void,
) {
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<T | null>(null);

  // 대상이 label안으로 처음 들어왔을때
  const handleDragIn = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // 대상이 label밖으로 나갔을때,
  const handleDragOut = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  // 대상이 label 위에 있을때
  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer?.files) {
      setIsDragging(true);
    }
  }, []);

  // 대상이 label위에 드랍되었을때
  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      onChange(e);
      setIsDragging(false);
    },
    [onChange],
  );

  const addDragEvents = useCallback(() => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const removeDragEvents = useCallback(() => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    addDragEvents();
    return () => removeDragEvents();
  }, [addDragEvents, removeDragEvents]);

  return [isDragging, dragRef] as const;
}
