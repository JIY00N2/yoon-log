import { MetadataRoute } from "next";
import { BASE_URL } from "./_constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/write"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
