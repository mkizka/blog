import { Link } from "react-router-dom";

const entryPaths = Object.keys(import.meta.glob("../entry/*.md")) //
  .map((entryPath) =>
    entryPath //
      .replace("..", "")
      .replace(".md", "")
  );

function Index() {
  return (
    <ul>
      {entryPaths.map((entryPath) => (
        <li key={entryPath}>
          <Link to={entryPath}>{entryPath}</Link>
        </li>
      ))}
    </ul>
  );
}

export { Index };
