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
        />
      </section>
      <section {...stylex.props(styles.infos)}>
        <p {...stylex.props(styles.strong)}>
          안녕하세요, 프런트엔드 개발자를 꿈꾸는 이지윤입니다.
        </p>
        <div {...stylex.props(styles.info)}>
          <p>
            개발 과정에서의 오류 해결과 결과물로부터 보람과 성취감을 느낍니다.
          </p>
          <p>
            새로운 기술을 도입하고 학습하는 데 거부감이 없으며, 계속해서
            도전하려고 노력합니다.
          </p>
          <p>
            사용자 경험을 향상시키고, 팀워크를 통해 효율적인 웹 애플리케이션을
            개발하는 것을 목표로 삼고 있습니다.
          </p>
          <p>최근에는 기술 블로그를 통해 인사이트를 확장하고 있습니다.</p>
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
