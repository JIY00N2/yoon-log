import { PropsWithChildren, ReactNode, useEffect, useState } from "react";

type Props = {
  fallback?: ReactNode;
} & PropsWithChildren;

// 첫 렌더링 시에는 useEffect 전이라 client, server 모두 isLogin이 false
// useEffect를 쓰는 이유는 client와 server의 첫 렌더링을 같게하려고(아니면 오류발생) -> 클라이언트 바운더리 컴포넌트 만들자
export default function ClientBoundary({ fallback, children }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return fallback;
  }

  return children;
}
