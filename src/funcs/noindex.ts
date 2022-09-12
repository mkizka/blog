function isCategory(category: string) {
  return [...document.querySelectorAll(".entry-category-link")].some(
    (n) => n.textContent == category
  );
}

function setNoIndex() {
  const noindex = document.createElement("meta");
  noindex.setAttribute("name", "robots");
  noindex.setAttribute("content", "noindex");
  document.head.appendChild(noindex);
}

export function noindex() {
  if (isCategory("雑記")) setNoIndex();
}
