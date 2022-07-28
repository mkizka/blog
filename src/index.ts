import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ja";

dayjs.locale("ja");
dayjs.extend(relativeTime);

function createAnchor() {
  const a = document.createElement("a");
  a.id = "commits-link";
  a.classList.add("entry-category-link");
  a.rel = "nofollow";
  a.href = `https://github.com/mkizka/blog/commits/main${location.pathname}.md`;
  return a;
}

function createImage(label: string) {
  const img = document.createElement("img");
  const url = new URL("https://img.shields.io");
  url.pathname = `/badge/${encodeURIComponent(label)}-black`;
  url.searchParams.set("logo", "github");
  url.searchParams.set("labelColor", "black");
  url.searchParams.set("color", "ddd");
  url.searchParams.set("style", "flat-square");
  img.src = url.toString();
  return img;
}

interface LdJSON {
  datePublished?: string;
  dateModified?: string;
}

function createCommitLink() {
  const ldJSONElement = document.querySelector('[type="application/ld+json"]');
  const ldJSON: LdJSON = JSON.parse(ldJSONElement!.textContent!);

  const label = dayjs(ldJSON.dateModified).isSame(ldJSON.datePublished, "day")
    ? "commits"
    : `commits (${dayjs(ldJSON.dateModified).fromNow()}に更新)`;

  const a = createAnchor();
  const img = createImage(label);
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
