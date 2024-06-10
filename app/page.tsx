import Image from "next/image";
import stylex from "@stylexjs/stylex";
import formattedDate from "./_utils/formattedDate";
import { PostsService } from "./_lib/posts/service";
import TabSummary from "./_components/TabSummary";
import PostLink from "./PostLink";

export const revalidate = 30;

export default async function HomePage() {
  const posts = await PostsService.getPosts();

  return (
    <>
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
              <PostLink
                isPrivate={post.isPrivate}
                slug={post.slug}
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
                    <div {...stylex.props(styles.h2Container)}>
                      {post.isPrivate && (
                        <div {...stylex.props(styles.private)}>작성중</div>
                      )}
                      <h2 {...stylex.props(styles.h2)}>{post.title}</h2>
                    </div>
                    <h3 {...stylex.props(styles.h3)}>{post.subTitle}</h3>
                  </div>
                  <div {...stylex.props(styles.infos)}>
                    <span {...stylex.props(styles.author)}>By Yoon</span>
                    <div {...stylex.props(styles.author)}>·</div>
                    <time {...stylex.props(styles.time)}>
                      {formattedDate(post.createdAt)}
                    </time>
                  </div>
                </div>
              </PostLink>
            </article>
          ))
        ) : (
          <span>없음</span>
        )}
      </section>
    </>
  );
}

const MEDIA_TABLET =
  "@media (min-width: 701px) and (max-width: 1100px)" as const;
const MEDIA_MOBILE = "@media (max-width: 700px)" as const;

const styles = stylex.create({
  posts: {
    display: "grid",
    width: "auto",
    height: "auto",
    marginTop: "20px",
    gridTemplateColumns: {
      default: "repeat(3, 1fr)",
      [MEDIA_TABLET]: "repeat(2, 1fr)",
      [MEDIA_MOBILE]: "1fr",
    },
    gap: "1.5rem",
  },
  post: {
    width: "100%",
    height: "350px",
    transition: "transform 0.3s ease-in-out",
    transform: {
      default: null,
      ":hover": "scale(1.025)",
    },
    paddingBottom: "1rem",
  },
  thumbnail: {
    display: "flex",
    aspectRatio: "2",
    minHeight: {
      default: "185px",
      [MEDIA_TABLET]: "0px",
      [MEDIA_MOBILE]: "0px",
    },
    position: "relative",
    borderRadius: "0.6rem",
    overflow: "hidden",
  },
  text: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "auto",
    flexGrow: "1",
    justifyContent: "space-between",
    gap: "0.3rem",
  },
  h: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gap: "0.5rem",
    height: "100%",
  },
  h2Container: {
    display: "flex",
    gap: "10px",
  },
  private: {
    backgroundColor: "lightPink",
    padding: "2px 5px",
    borderRadius: "5px",
    whiteSpace: "nowrap",
    textAlign: "center",
    fontWeight: 500,
  },
  h2: {
    width: "100%",
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "var(--font)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
  },
  h3: {
    width: "100%",
    height: "70px",
    flexGrow: "1",
    fontSize: "1rem",
    fontWeight: 600,
    color: "var(--text300)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
  },
  infos: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  author: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "var(--font)",
  },
  time: {
    fontSize: "0.9rem",
    fontWeight: 500,
    color: "var(--text300)",
  },
});
