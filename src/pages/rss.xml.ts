import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getAllPostsSorted } from "../lib/posts";

export async function GET(context: APIContext) {
  const posts = await getAllPostsSorted();
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
