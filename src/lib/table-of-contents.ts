import type { MarkdownHeading } from "astro";

export interface Headings {
  text: string;
  slug: string;
  children: Headings[];
}

export function buildToc(
  headings: MarkdownHeading[],
  baseDepth: number,
): Headings[] {
  if (headings.length === 0) {
    return [];
  }

  let currentHeading = headings[0];
  if (currentHeading === undefined) {
    throw new Error();
  }
  if (headings.length === 1) {
    return [
      { text: currentHeading.text, slug: currentHeading.slug, children: [] },
    ];
  }

  let startIndex = 0;
  const toc: Headings[] = [];

  for (const [i, heading] of headings.entries()) {
    if (heading.depth === baseDepth + 1) {
      if (i === startIndex) {
        continue;
      }
      const child = buildToc(headings.slice(startIndex + 1, i), baseDepth + 1);
      toc.push({
        text: currentHeading.text,
        slug: currentHeading.slug,
        children: child,
      });
      startIndex = i;
      currentHeading = headings[i];
      if (currentHeading === undefined) {
        throw new Error();
      }
    } else if (heading.depth < baseDepth) {
      throw new Error(`Heading ${heading.text} has inconsistent depth`);
    } else {
      continue;
    }
  }
  toc.push({
    text: currentHeading.text,
    slug: currentHeading.slug,
    children: buildToc(
      headings.slice(startIndex + 1, headings.length),
      baseDepth + 1,
    ),
  });

  return toc;
}
