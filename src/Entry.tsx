import { useEffect, useState } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remark2rehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { useParams } from "react-router-dom";

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remark2rehype)
  .use(rehypeStringify);

function Entry() {
  const [content, setContent] = useState<string | null>(null);
  const { entryId } = useParams();

  useEffect(() => {
    import(`../entry/${entryId}.md`).then(({ default: entry }) => {
      const content = processor.processSync(entry);
      setContent(content.value);
    });
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: content! }} />;
}

export { Entry };
