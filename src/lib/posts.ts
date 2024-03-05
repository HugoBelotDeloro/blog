import {
  getCollection,
  getEntry,
  type CollectionEntry,
  type Render,
} from "astro:content";

export async function getAllPostsSorted() {
  const posts: CollectionEntry<"posts">[] = await getCollection(
    "posts",
    (post) => import.meta.env.DEV || post.data.draft !== true,
  );

  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

const slugsToRenderedPosts: Record<string, Awaited<Render[".mdx"]>> = {};

export async function getRenderedPost(slug: string) {
  const post = await getEntry("posts", slug);
  if (post === undefined) {
    throw new Error(`Unknown post slug "${slug}"`);
  }
  let rendered = slugsToRenderedPosts[slug];
  if (rendered === undefined) {
    rendered = await post.render();
    slugsToRenderedPosts[slug] = rendered;
  }
  return rendered;
}
