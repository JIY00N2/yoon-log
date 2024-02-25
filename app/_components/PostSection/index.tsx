"use client";

import stylex from "@stylexjs/stylex";
import SideBar from "../SideBar";
import { useCallback, useState } from "react";
import DynamicMDContent from "../MDContent/DynamicMDContent";

// MDContent 컴포넌트를 dynamic으로 가져와서 MDContent 안의 모든 import문을 dynamic으로 가져옴(마크다운 라이브러리 포함)

type Props = {
  content: string;
};

export default function PostSection({ content }: Props) {
  // MDContent의 로딩 상태를 알고 싶어서
  // MDContent가 마운트(로드) 됐을때 isLoaded를 true로 바꿔서
  // PostSection 전체를 리렌더링 시켜서 SideBar를 렌더링시켜서 화면에 띄우고 싶어(사이드바는 mdcontent가 마운트 된 후에 h태그를 검사함)
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // before: section  => MDContent => useEffect => SideBar => MarkDown(dynamic)
  // after:  section  => MDContent(dynamic) => MarkDown => useEffect => SideBar
  // 1. PostSection render 2. MDContent render 3. useEffect run 4. onLoad run 5. PostSection rerender 6. SideBar render 7. MarDown render (사이드바가 마크다운 보다 먼저 렌더링 됨..이러면 안그려짐)
  // 1. PostSection render 2. MDContent dynamic render 3. MarkDown render 4. useEffect run 5. onLoad run 6. PostSection rerender 7. SideBar render (사이드바가 마크다운 보다 나중에 렌더링 되면서 그려짐)
  return (
    <section {...stylex.props(styles.content)}>
      <DynamicMDContent
        source={content}
        onLoad={handleLoad}
      />
      {isLoaded && <SideBar />}
    </section>
  );
}

const styles = stylex.create({
  content: {
    display: "flex",
    width: "100%",
    position: "relative",
  },
});
