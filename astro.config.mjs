import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./src/lib/remark-plugins/reading-time";

export default defineConfig({
  site: "https://hugobelotdeloro.github.io/",
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});
