import Link from "next/link";
import Image from "next/image";
import stylex from "@stylexjs/stylex";
import formattedDate from "./_utils/formattedDate";
import { PostsService } from "./_lib/posts/service";
import TabSummary from "./_components/TabSummary";

export const revalidate = 30;

export default async function HomePage() {
  const posts = await PostsService.getPosts();

  return (
    <div>
      <TabSummary
        title={"Post"}
        content={"학습한 지식과 구현한 프로젝트들에 대한 기록입니다."}
      />
      <section {...stylex.props(styles.posts)}>
        {posts ? (
          posts.map((post) => (
            <article
              key={post._id.toString()}
              {...stylex.props(styles.post)}
            >
              <Link
                href={`/posts/${post.slug}`}
                rel="preload"
                {...stylex.props(styles.link)}
              >
                <div {...stylex.props(styles.thumbnail)}>
                  {post.thumbnailUrl && (
                    <Image
                      src={post.thumbnailUrl}
                      alt="thumbnail"
                      priority
                      layout="fill"
                      objectFit="cover"
                    />
                  )}
                </div>
                <div {...stylex.props(styles.text)}>
                  <div {...stylex.props(styles.h)}>
                    <h2 {...stylex.props(styles.h2)}>{post.title}</h2>
                    <h4 {...stylex.props(styles.h4)}>{post.subTitle}</h4>
                  </div>
                  <div {...stylex.props(styles.infos)}>
                    <span {...stylex.props(styles.author)}>By Yoon</span>
                    <div {...stylex.props(styles.author)}>·</div>
                    <time {...stylex.props(styles.time)}>
                      {formattedDate(post.createdAt)}
                    </time>
                  </div>
                </div>
              </Link>
            </article>
          ))
        ) : (
          <span>없음</span>
        )}
      </section>
    </div>
  );
}

const MEDIA_TABLET =
  "@media (min-width: 701px) and (max-width: 1100px)" as const;
const MEDIA_MOBILE = "@media (max-width: 700px)" as const;

const styles = stylex.create({
  layout: {
    display: "flex",
  },
  posts: {
    display: "grid",
    width: "100%",
    height: "auto",
    marginTop: "20px",
    gridTemplateColumns: {
      default: "repeat(3, minmax(33%, auto))",
      [MEDIA_TABLET]: "repeat(2, 50%)",
      [MEDIA_MOBILE]: "1fr",
    },
    gap: "1rem",
  },
  post: {
    width: "100%",
    minHeight: "300px",
    minWidth: "300px",
    padding: "0.5rem",
    transition: "transform 0.3s ease-in-out",
    transform: {
      default: null,
      ":hover": "scale(1.025)",
    },
  },
  link: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    gap: "0.7rem",
  },
  thumbnail: {
    display: "flex",
    width: "100%",
    minHeight: {
      default: "180px",
      [MEDIA_TABLET]: "200px",
      [MEDIA_MOBILE]: "220px",
    },
    position: "relative",
    borderRadius: "10px",
    overflow: "hidden",
  },
  text: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
  h: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gap: "0.5rem",
  },
  h2: {
    display: "flex",
    width: "100%",
    fontSize: "1.2rem",
    fontWeight: 700,
  },
  h4: {
    display: "flex",
    width: "100%",
    fontSize: "1rem",
    fontWeight: 600,
    color: "rgba(0, 19, 43, 0.58)",
  },
  infos: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  author: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#171717",
  },
  time: {
    fontSize: "0.9rem",
    fontWeight: 500,
    color: "rgba(0, 19, 43, 0.58)",
  },
});
