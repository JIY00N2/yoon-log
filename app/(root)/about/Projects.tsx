import stylex from "@stylexjs/stylex";
import Link from "next/link";
import GithubSvg from "@/public/images/github.svg";
import LinkSvg from "@/public/images/link.svg";
import { colors } from "@/app/globalTokens.stylex";
import Image from "next/image";

const projects = [
  {
    title: "개인 기술 블로그",
    githubHref: "https://github.com/JIY00N2/yoon-log",
    siteHref: "https://yoon-log.vercel.app",
    subTitle:
      "관리자가 글을 직접 CRUD 할 수 있는 풀스택으로 구현한 동적 기술 블로그",
    imageSrc: "/images/yoon-log.jpg",
  },
  {
    title: "스테디(Steady)",
    githubHref: "https://github.com/Team-Blitz-Steady/steady-client",
    siteHref: "https://www.steadies.kr",
    subTitle: "IT 분야의 스터디 및 프로젝트 인원 모집 플랫폼",
    imageSrc: "/images/steady.png",
  },
  {
    title: "앙골라(Angola)",
    githubHref: "https://github.com/prgrms-fe-devcourse/FEDC4_Angola_NaYoung",
    siteHref: "https://fedc4-angola.vercel.app",
    subTitle:
      "한 주제에 대해 사용자들이 A와 B 중 하나를 선택하여 각자의 의견을 공유하는 밸런스 게임 커뮤니티 플랫폼",
    imageSrc: "/images/angola.png",
  },
];

export default function Projects() {
  return (
    <div {...stylex.props(styles.layout)}>
      {projects.map((project, id) => (
        <article
          key={id}
          {...stylex.props(styles.article)}
        >
          <section {...stylex.props(styles.container)}>
            <div {...stylex.props(styles.titleContainer)}>
              <h1 {...stylex.props(styles.title)}>{project.title}</h1>
              <div {...stylex.props(styles.link)}>
                <Link
                  href={project.githubHref}
                  aria-label="github"
                >
                  <GithubSvg
                    color={"var(--font)"}
                    width={20}
                    height={20}
                  />
                </Link>
                <Link
                  href={project.siteHref}
                  aria-label="link"
                >
                  <LinkSvg
                    color={colors.point}
                    width={22}
                    height={22}
                  />
                </Link>
              </div>
            </div>
            <p {...stylex.props(styles.subTitle)}>{project.subTitle}</p>
          </section>
          <section {...stylex.props(styles.image)}>
            <Image
              src={project.imageSrc}
              alt={project.title}
              layout="fill"
              objectFit="cover"
            />
          </section>
        </article>
      ))}
    </div>
  );
}

const MEDIA_TABLET =
  "@media (min-width: 701px) and (max-width: 1100px)" as const;
const MEDIA_MOBILE = "@media (max-width: 700px)" as const;

const styles = stylex.create({
  layout: {
    display: "grid",
    width: "auto",
    height: "auto",
    gridTemplateColumns: {
      default: "repeat(2, 1fr)",
      [MEDIA_TABLET]: "repeat(2, 1fr)",
      [MEDIA_MOBILE]: "1fr",
    },
    gap: "1.2rem",
    fontSize: "1rem",
    color: "var(--font)",
  },
  article: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "var(--text300)",
    borderRadius: "5px",
    padding: "1rem",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: "1.1rem",
    fontWeight: 600,
  },
  subTitle: {
    color: "var(--text300)",
    fontSize: "0.9rem",
  },
  link: {
    display: "flex",
    gap: "0.8rem",
  },
  image: {
    display: "flex",
    aspectRatio: "2",
    width: "100%",
    position: "relative",
    borderRadius: "10px",
    marginTop: "2rem",
    overflow: "hidden",
  },
});
