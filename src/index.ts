import "./index.css";

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

function fromNow(date: string) {
  let diff = Math.ceil(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );
  if (diff <= 60) return `${diff}秒前`;
  diff = Math.ceil(diff / 60);
  if (diff <= 60) return `${diff}分前`;
  diff = Math.ceil(diff / 60);
  if (diff <= 24) return `${diff}時間前`;
  diff = Math.ceil(diff / 24);
  return diff >= 30 ? "30日以上前" : `${diff}日前`;
}

interface LdJSON {
  datePublished: string;
  dateModified: string;
}

function createCommitLink() {
  const ldJSONElement = document.querySelector('[type="application/ld+json"]');
  const ldJSON: LdJSON = JSON.parse(ldJSONElement!.textContent!);

  const label = `commits (${fromNow(ldJSON.dateModified)}に更新)`;

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
