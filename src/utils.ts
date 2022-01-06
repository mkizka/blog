import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remark2rehype from "remark-rehype";
import remarkStringify from "remark-stringify";
import rehypeStringify from "rehype-stringify";
import remarkExtract from "remark-extract-frontmatter";
import yaml from "yaml";

import { hatenaCard } from "./rehype-hatena-card";

export async function md2html(md: string) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remark2rehype)
    .use(hatenaCard)
    .use(rehypeStringify, { allowDangerousHtml: true });
  return (await processor.process(md)).value;
}

type Frontmatter = {
  categories: string[];
  date: string;
  draft: boolean;
  id: string;
  title: string;
};

function md2frontmatter(md: string) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkFrontmatter)
    .use(remarkExtract, { yaml: yaml.parse });
  return processor.processSync(md).data as Frontmatter;
}

function getEntryId(path: string) {
  return path.replace("../entry/", "").replace(".md", "");
}

export function getEntryImporters() {
  return Object.entries(import.meta.glob("../entry/*.md")).reduce(
    (result, [path, importer]) => {
      const entryId = getEntryId(path);
      result[entryId] = async () => (await importer()).default as string;
      return result;
    },
    {} as { [entryId: string]: () => Promise<string> }
  );
}

export function getEntryMetas() {
  return Object.entries(import.meta.globEager("../entry/*.md")).reduce(
    (result, [path, { default: entry }]) => {
      const entryId = getEntryId(path);
      result[entryId] = md2frontmatter(entry);
      return result;
    },
    {} as { [entryId: string]: Frontmatter }
  );
}
