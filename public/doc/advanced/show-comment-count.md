# コメント数の表示

ページのコメント数を表示したいときは、`js/cusdis-count.umd.js`を`<body>`の一番下に記述する。そして、コメント数を表示したい要素に`data-cusdis-count-page-id="{{ PAGE ID }}"`という属性を追加します。

```html
<body>
  <div>
    <h1>タイトル</h1>
    <span data-cusdis-count-page-id="{{ PAGE_ID }}">0</span>コメント
  </div>
  <script defer data-host="https://cusdis.com" data-app-id="{{ APP_ID }}" src="https://cusdis.com/js/cusdis-count.umd.js"></script>
</body>
```

このスクリプトは現在のページ内のすべての`data-cusdis-count-page-id`を収集し、コメント数を取得します。そして、そのカウント数を要素に置き換えます。

セルフホスト版を使用している場合は、`https://cusdis.com`を自分のドメインに変更してください。

もし`data-cusdis-count-page-id`を持つ要素が複数ある場合、スクリプトはクエリを1つにまとめます。

## API

このUMDスクリプトは`window`オブジェクトに対して`CUSDIS_COUNT`を公開します。

## window.CUSDIS_COUNT.initial()

ページ内のカウントを手動で更新します。