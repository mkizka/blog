import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getEntryImporters, md2html } from "./utils";

const entries = getEntryImporters();

function useEntryId() {
  const { entryId } = useParams();
  if (typeof entryId == "string" && entryId in entries) {
    return entryId;
  }
  throw new Error(`entry/${entryId}.mdが存在しません`);
}

function Entry() {
  const [content, setContent] = useState<string | null>(null);
  const entryId = useEntryId();

  useEffect(() => {
    entries[entryId]().then(md2html).then(setContent);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: content! }} />;
}

export { Entry };
