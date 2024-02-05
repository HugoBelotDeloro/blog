import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import { remarkReadingTime } from "./src/lib/remark-plugins/reading-time";

export default defineConfig({
  site: "https://hugobelotdeloro.github.io/",
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [remarkReadingTime, remarkMath],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
    ],
  },
});
