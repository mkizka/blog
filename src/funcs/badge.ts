function createAnchor(text: string) {
  const a = document.createElement("a");
  a.classList.add("entry-category-link");
  a.rel = "nofollow";
  a.href = `https://github.com/mkizka/blog/commits/main${location.pathname}.md`;
  a.textContent = text;
  return a;
}

function createImage() {
  const img = document.createElement("img");
  img.src = "https://cdn.simpleicons.org/github";
  img.width = 16;
  img.height = 16;
  img.style.verticalAlign = "middle";
  img.style.marginLeft = "4px";
  img.style.marginBottom = "2px";
  return img;
}

function fromNow(date: string) {
  let diff = Math.ceil(
    (new Date().getTime() - new Date(date).getTime()) / 1000,
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

  const label = `${fromNow(ldJSON.dateModified)}に更新`;

  const a = createAnchor(label);
  const image = createImage();
  a.appendChild(image);
  return a;
}

export function badge() {
  const categories = document.querySelector(".entry-categories");
  if (categories) {
    categories.appendChild(createCommitLink());
  }
}
