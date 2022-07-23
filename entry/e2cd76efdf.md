---
title: 記事タイトル下に更新時間が分かるラベルを設置した
date: 2022-05-19T17:16:22.000Z
categories:
  - 作ったもの
id: "13574176438096992377"
draft: false
---

記事タイトル下にざっくりした更新時間を書いた GitHub へのリンクを設置しました。

<!-- more -->

![](https://pages.mkizka.dev/20220520015249.png)

2021 年 9 月に書いた上記記事の場合は、この記事を書いている 2022 年 5 月に更新されたことが一目で分かるようになっています。

さらにこのラベルは GitHub へのリンクになっており、記事のどこが変更されたのかが差分で分かります(とはいえ見る人いないと思うので自己満足ですが)。

コードは記事執筆時点で以下の通りです。ライブラリ読み込みなどは省略。

```javascript
const jsonText = document.querySelectorAll(
  'head script[type="application/ld+json"]'
)[0].innerText;
const { datePublished, dateModified } = JSON.parse(jsonText);

dayjs.locale("ja");
dayjs.extend(dayjs_plugin_relativeTime);
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
img.src = src;

a.appendChild(img);
document.querySelector(".entry-categories").appendChild(a);
```

参考：

[https://multimineral-tech.com/entry/2021/02/06/005845:embed]
