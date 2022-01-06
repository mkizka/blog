import { Link } from "react-router-dom";

import { getEntryMetas } from "./utils/entries";

const entryMetas = getEntryMetas();

function Index() {
  return (
    <ul>
      {Object.entries(entryMetas).map(([entryId, meta]) => (
        <li key={entryId}>
          <Link to={`/entry/${entryId}`}>{meta.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export { Index };
