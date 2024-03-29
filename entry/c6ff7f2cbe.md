---
title: はてなブログ記事をプレビューするVSCode拡張機能を作った
date: 2022-01-18T13:07:01.000Z
categories:
  - 技術
id: "13574176438048123050"
draft: false
---

Zenn ( https://zenn.dev )の GitHub 連携で投稿する方法が好きなので、はてなブログも同じように投稿したいところです。

今回はブログ記事を VSCode で編集して、 GitHub から投稿できるように整備してみたので、やったことを紹介します。

[f:id:mkizka:20220118161117p:plain]

<!-- more -->

[:contents]

## はじめに

この記事に書いたもろもろを適用したテンプレートを作りました。

[https://github.com/mkizka/blogview-template:embed]

## やったこと

投稿にはすでに blogsync、gimonfu などのツールがあるようです。

- https://github.com/x-motemen/blogsync
- https://github.com/yammerjp/gimonfu

しかし、編集した投稿のプレビュー方法は無いようです。はてなブログ公式のプレビューは編集画面から起動する前提のようで、公式の編集画面と VSCode などのエディタを同時に起動するのも微妙です。

ドキュメントを読んだところ VSCode の Markdown プレビューは設定や拡張機能でカスタマイズ出来るようなので、これをやっていきます。

[https://code.visualstudio.com/api/extension-guides/markdown-extension:embed]

## VSCode の Markdown プレビューに CSS を追加した

`.vscode/settings.json`に CSS ファイルを置くと適用出来ます。

```json
{
  "markdown.styles": [".vscode/style.css"]
}
```

今回は new.css というフレームワークを読み込んでみます。

```css
/* https://newcss.net/usage/ */
@import url("https://fonts.xz.style/serve/inter.css");
@import url("https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css");
```

これだけでもかなりいい感じになります。

## Markdown プレビュー向け拡張機能を作った

はてなブログを Markdown 記法で書く時でも、一部のはてな記法は使う人もいると思います。

VSCode の Markdown プレビューは Markdown-it のプラグインで拡張できるようなので、(一部の)はてな記法を変換するプラグインを作りました。

[https://marketplace.visualstudio.com/items?itemName=mkizka.blogview-vscode:embed]

記事執筆時点では`:contents`、`:embed`、`:cite`に対応しています。これ以外のはてな記法をほとんど使っていないので、これが欲しいというものがあれば Issue/PR お待ちしています。

Markdown-it のプラグインの作り方は Zenn で[記事](https://zenn.dev/mkizka/articles/9d4954d83b8862)を書きました。

### プレビューに iframe 要素を表示する

`:embed`で変換したカードは`iframe`として描画されていますが、VSCode のデフォルト設定ではセキュリティ対策として`iframe`要素が非表示になっています。

1. プレビューに表示される「このドキュメントで一部のコンテンツが無効になっています」をクリック
2. セキュリティ設定を「無効にする」

とすると表示されます。ドキュメントはこちら。

[https://code.visualstudio.com/docs/languages/markdown#_markdown-preview-security:embed]

セキュリティ設定を無効化することで攻撃に脆弱になるため、信頼出来るファイルのみプレビューするようにしてください。

## ブラウザでプレビューする CLI を作った

拡張機能を作る前に、zenn-cli の実装を参考にブラウザでプレビュー出来る CLI も作っていました。

[https://github.com/mkizka/blogview:embed]

使い方は、`entry`ディレクトリに Markdown ファイルを配置した状態で、`blogview`コマンドを実行するだけです。

```shell
$ npm i -g blogview
$ blogview
プレビュー: http://localhost:8000
```

gimonfu と組み合わせて使うことを想定しています。詳しい使い方は README を見て下さい。

## GitHub Actions ではてなブログ記事を自動投稿するようにした

GitHub の Secrets に`GIMONFU_JSON`として.gimonfu.json のファイルの内容を設定し、投稿時にファイルとして出力するようにしています。

```yaml
name: "Push Entries"

on:
  push:
    branches:
      - main

jobs:
  push:
    name: "Push Entries"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: pnpm/action-setup@v2.0.1
        with:
          version: 6
      - uses: actions/setup-node@v2
        with:
          node-version: 16
          cache: "pnpm"
      - run: pnpm i
      - name: "Push Articles"
        run: echo '${{ secrets.GIMONFU_JSON }}' > .gimonfu.json && pnpm push
```

## おわり

blogview は今後も自分で使いながら少しずつ調整していく予定です。

ぜひ使ってみて下さい。
