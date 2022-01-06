import { Link } from "react-router-dom";

import { entries } from "./utils/entries";
import { md2frontmatter } from "./utils/transformers";

function Index() {
  return (
    <ul>
      {Object.entries(entries).map(([entryId, entry]) => (
        <li key={entryId}>
          <Link to={`/entry/${entryId}`}>{md2frontmatter(entry).title}</Link>
        </li>
      ))}
    </ul>
  );
}

export { Index };
