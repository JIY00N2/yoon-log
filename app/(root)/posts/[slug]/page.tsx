import stylex from "@stylexjs/stylex";
import Image from "next/image";
import AdminButton from "@/app/_components/AdminButton";
import PostSection from "@/app/_components/PostSection";
import { PostsService } from "@/app/_lib/posts/service";
import formattedDate from "@/app/_utils/formattedDate";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await PostsService.getPost(decodeURI(params.slug));

  return (
    <div {...stylex.props(styles.layout)}>
      {post ? (
        <div {...stylex.props(styles.container)}>
          <section {...stylex.props(styles.titleContainer)}>
            <h1 {...stylex.props(styles.title)}>{post.title}</h1>
            <div {...stylex.props(styles.infos)}>
              <div {...stylex.props(styles.info)}>
                <span {...stylex.props(styles.author)}>By Yoon</span>
                <div {...stylex.props(styles.author)}>·</div>
                <time {...stylex.props(styles.time)}>
                  {formattedDate(post.createdAt)}
                </time>
              </div>
              <AdminButton slug={params.slug} />
            </div>
          </section>
          <section {...stylex.props(styles.subContainer)}>
            <section {...stylex.props(styles.thumbnail)}>
              {post.thumbnailUrl && (
                <Image
                  src={post.thumbnailUrl}
                  alt="thumbnail"
                  priority
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </section>
            <div {...stylex.props(styles.subTitle)}>{post.subTitle}</div>
          </section>
          <PostSection content={post.content} />
        </div>
      ) : (
        <span>없음</span>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await PostsService.getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const styles = stylex.create({
  layout: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "100%",
    maxWidth: "768px",
    gap: "2rem",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "2.25rem",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "var(--font)",
  },
  infos: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
  },
  author: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "var(--font)",
  },
  time: {
    textAlign: "center",
    fontSize: "1rem",
    fontWeight: 600,
    color: "var(--font)",
  },
  subContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "3rem",
  },
  thumbnail: {
    display: "flex",
    position: "relative",
    borderRadius: "0.6rem",
    overflow: "hidden",
    aspectRatio: "2",
    marginBottom: "1rem",
  },
  subTitle: {
    fontSize: "1.2rem",
    fontWeight: 600,
    color: "var(--text300)",
    borderLeftWidth: "3px",
    borderLeftStyle: "solid",
    borderLeftColor: "var(--text300)",
    paddingLeft: "1rem",
  },
});
