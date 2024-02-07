export type PostType = {
  title: string;
  content: string;
};

export type CreatedPostType = PostType & { slug: string };
