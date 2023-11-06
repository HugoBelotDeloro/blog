import { getCollection } from "astro:content";

export async function getAllPostsSorted() {
  const posts = await getCollection(
    "posts",
    (post) => post.data.draft !== true,
  );

  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
