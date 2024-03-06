import { MetadataRoute } from "next";
import formattedDate from "./_utils/formattedDate";
import { PostsService } from "./_lib/posts/service";
import { BASE_URL } from "./_constants";

export async function generateSitemaps() {
  const posts = await PostsService.getPosts();
  return posts.map((post) => ({
    id: post._id,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesSitemaps = ["/", "/about", "/portfolio"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: formattedDate(new Date()),
  }));

  const posts = await PostsService.getPosts();
  const postsSitemaps = posts.map((post) => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: formattedDate(post.updatedAt),
  }));

  const sitemaps = [...routesSitemaps, ...postsSitemaps];

  return sitemaps;
}
