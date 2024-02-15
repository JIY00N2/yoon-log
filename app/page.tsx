import Link from "next/link";
import formattedDate from "./_utils/formattedDate";
import { PostsService } from "./_lib/posts/service";
import stylex from "@stylexjs/stylex";
import TabSummary from "./_components/TabSummary";
import Image from "next/image";

export const revalidate = 30;

export default async function HomePage() {
  const posts = await PostsService.getPosts();

  return (
    <div>
      <TabSummary
        title={"Post"}
        content={"학습한 지식과 구현한 프로젝트들에 대한 기록입니다."}
      />
      <div {...stylex.props(styles.posts)}>
        {posts ? (
          posts.map((post) => (
            <Link
              key={post._id.toString()}
              href={`/posts/${post.slug}`}
              rel="preload"
            >
              <div>title: {post.title}</div>
              <div>subTitle:{post.subTitle}</div>
              {post.thumbnailUrl && (
                <Image
                  src={post.thumbnailUrl}
                  alt="thumbnail"
                  priority
                  width={100}
                  height={100}
                />
              )}
              <div>createdAt: {formattedDate(post.createdAt)}</div>
            </Link>
          ))
        ) : (
          <span>없음</span>
        )}
      </div>
    </div>
  );
}

const styles = stylex.create({
  layout: {
    display: "flex",
  },
  posts: {
    display: "flex",
    flexDirection: "column-reverse",
  },
});
