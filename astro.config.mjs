import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import { remarkReadingTime } from "./src/lib/remark-plugins/reading-time";

export default defineConfig({
  site: "https://iridescent.pages.dev/",
  integrations: [mdx(), icon(), sitemap()],
  markdown: {
    remarkPlugins: [remarkReadingTime, remarkMath],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          content: {
            type: "element",
            tagName: "span",
            properties: {
              className: "heading-link",
            },
          },
          headingProperties: { class: "heading" },
        },
      ],
      [
        rehypeExternalLinks,
        {
          properties: {
            className: "external-link",
          },
        },
      ],
    ],
  },
});
