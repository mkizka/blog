import { Transformer, Plugin } from "unified";
import { visit } from "unist-util-visit";

function getHatenaParams(text: string) {
  const matched = /\[(?<url>.*?)(?<labels>(:\w+)*)\]/g.exec(text);
  if (matched) {
    return {
      url: matched.groups!.url,
      labels: matched.groups!.labels.split(":").filter(Boolean),
    };
  }
  return null;
}
const hatenaCard: Plugin = () => {
  const transformer: Transformer = async (tree, _) => {
    visit(tree, "text", (node) => {
      const { value: text }: { value: string } = node;
      const params = getHatenaParams(text);
      if (params == null) return;
      if (params.labels.includes("embed")) {
        //TODO
      }
    });
  };
  return transformer;
};

export { hatenaCard };
