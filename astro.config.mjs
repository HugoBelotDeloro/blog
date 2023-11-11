import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { remarkReadingTime } from "./src/lib/remark-plugins/reading-time";

export default defineConfig({
  site: "https://hugobelotdeloro.github.io/",
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [remarkReadingTime, remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
