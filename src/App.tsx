import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remark2rehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import content from "../entry/1ca9d170c9.md";
import "@exampledev/new.css";

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remark2rehype)
  .use(rehypeStringify);
const html = processor.processSync(content);

function App() {
  return <div dangerouslySetInnerHTML={{ __html: html.value }} />;
}

export default App;
