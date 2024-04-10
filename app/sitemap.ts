import { MetadataRoute } from "next";
import { BASE_URL } from "./_constants";
import { PostsService } from "./_lib/posts/service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await PostsService.getPosts();
  const postsSitemap = posts.map((post) => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
    },
    ...postsSitemap,
  ];
}
