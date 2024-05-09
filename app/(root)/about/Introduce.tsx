import stylex from "@stylexjs/stylex";
import Image from "next/image";

export default function Introduce() {
  return (
    <div {...stylex.props(styles.layout)}>
      <section {...stylex.props(styles.profile)}>
        <Image
          src="/images/profile.jpeg"
          alt="profile"
          layout="fill"
          objectFit="cover"
          style={{ borderRadius: "10px" }}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMaL1RDwAFKAI2AzSFRQAAAABJRU5ErkJggg=="
        />
      </section>
      <section {...stylex.props(styles.infos)}>
        <p {...stylex.props(styles.strong)}>
          안녕하세요, 프론트엔드 개발자 이지윤입니다.
        </p>
        <div {...stylex.props(styles.info)}>
          <p>Next.js, React.js, Typescript 프로젝트 경험이 있습니다.</p>
          <p>새로운 기술을 학습하고 이를 구현하는 것에 흥미를 느낍니다.</p>
          <p>개발 과정에서 발생한 문제를 해결하고 기록합니다.</p>
          <p>
            사용자와 직접 소통하며 사용자 경험이 우수한 서비스를 제공하려고
            노력합니다.
          </p>
          <p>{"'나보다는 우리'를 우선시합니다."}</p>
        </div>
        <div {...stylex.props(styles.info)}>
          <span {...stylex.props(styles.strong)}>☎️ Contact</span>
          <p>Email: angella990825@gmail.com</p>
          <p>Github: https://github.com/JIY00N2</p>
          <p>Blog: https://yoon-log.vercel.app</p>
        </div>
      </section>
    </div>
  );
}

const MEDIA_MOBILE = "@media (max-width: 700px)" as const;

const styles = stylex.create({
  layout: {
    display: "flex",
    gap: "1.5rem",
    flexDirection: {
      [MEDIA_MOBILE]: "column",
    },
    alignItems: {
      [MEDIA_MOBILE]: "center",
    },
    justifyContent: {
      [MEDIA_MOBILE]: "center",
    },
  },
  profile: {
    display: "flex",
    aspectRatio: "1",
    width: "100%",
    maxHeight: "250px",
    maxWidth: "250px",
    position: "relative",
  },
  strong: {
    fontSize: "1.1rem",
    fontWeight: 600,
  },
  infos: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    fontSize: "1rem",
    color: "var(--font)",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
});
