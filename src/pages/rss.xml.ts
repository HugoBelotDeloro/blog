import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  const posts = await getCollection("posts");
  return rss({
    title: "Iridescent's blog",
    description: "Posts from Iridescent's blog",
    site: context.site || "",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/posts/${post.slug}/`,
    })),
  });
}
