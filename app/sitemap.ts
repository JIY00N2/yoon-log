import { MetadataRoute } from "next";
import formattedDate from "./_utils/formattedDate";
import { PostsService } from "./_lib/posts/service";

const BASE_URL = "https://yoon-log.vercel.app";

export async function generateSitemaps() {
  const posts = await PostsService.getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesSiteMap = ["/", "/about", "/portfolio"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: formattedDate(new Date()),
  }));

  const posts = await PostsService.getPosts();
  const postsSiteMap = posts.map((post) => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: formattedDate(post.updatedAt),
  }));

  const allSiteMap = [...routesSiteMap, ...postsSiteMap];

  return allSiteMap;
}
