export type CreatedPostType = {
  title: string;
  content: string;
  tags?: string[];
};

export type UpdatedPostType = {
  title: string;
  content: string;
  tags: string[];
};
