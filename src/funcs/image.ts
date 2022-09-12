function replaceImages(img: HTMLImageElement) {
  const imgParent = img.parentElement!;
  const a = document.createElement("a");
  a.href = img.src;
  a.target = "_blank";
  a.appendChild(img);
  imgParent.appendChild(a);
}

export function image() {
  const entryContent = document.querySelector(".entry-content");
  if (entryContent) {
    entryContent.querySelectorAll("img").forEach(replaceImages);
  }
}
