import { PropsWithChildren, ReactNode, useEffect, useState } from "react";

export default function ClientBoundary({
  fallback,
  children,
}: PropsWithChildren<{ fallback?: ReactNode }>) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return fallback;
  }

  return children;
}
