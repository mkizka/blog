import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ja";

dayjs.locale("ja");
dayjs.extend(relativeTime);

function createCommitLink() {
  const jsonText = document.querySelectorAll(
    'head script[type="application/ld+json"]'
  )[0].textContent!;
  const { datePublished, dateModified } = JSON.parse(jsonText);

  const label = dayjs(dateModified).isSame(datePublished, "day")
    ? "commits"
    : `commits (${dayjs(dateModified).fromNow()}に更新)`;

  const a = document.createElement("a");
  a.id = "commits-link";
  a.classList.add("entry-category-link");
  a.rel = "nofollow";
  a.href = `https://github.com/mkizka/blog/commits/main${location.pathname}.md`;

  const img = document.createElement("img");
  const src = new URL("https://img.shields.io");
  src.pathname = `/badge/${encodeURIComponent(label)}-black`;
  src.searchParams.set("logo", "github");
  src.searchParams.set("labelColor", "black");
  src.searchParams.set("color", "ddd");
  src.searchParams.set("style", "flat-square");
  img.src = src.toString();

  a.appendChild(img);
  return a;
}

function replaceImages(img: HTMLImageElement) {
  const imgParent = img.parentElement!;
  const a = document.createElement("a");
  a.href = img.src;
  a.target = "_blank";
  a.appendChild(img);
  imgParent.appendChild(a);
}

window.addEventListener("load", () => {
  const categories = document.querySelector(".entry-categories");
  if (categories) {
    categories.appendChild(createCommitLink());
  }
  const entryContent = document.querySelector(".entry-content");
  if (entryContent) {
    entryContent.querySelectorAll("img").forEach(replaceImages);
  }
});
