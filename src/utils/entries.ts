import { Frontmatter, md2frontmatter } from "./transformers";

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
