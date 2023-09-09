# JavaScript SDK

# JS SDK

JavaScript SDKの仕組みを理解することで、既存のシステムにCusdisを統合することができます。

コメントウィジェットをウェブページに埋め込むには、埋め込みたい位置に**要素とJavaScript SDK**を置く必要があります：

```html
<div id="cusdis_thread"
  data-host="https://cusdis.com"
  data-app-id="{{ APP_ID }}"
  data-page-id="{{ PAGE_ID }}"
  data-page-url="{{ PAGE_URL }}"
  data-page-title="{{ PAGE_TITLE }}"
>
<script async src="https://cusdis.com/js/cusdis.es.js"></script>
```

> もしセルフホストのCusdisを使用しているのであれば、`<script>`内の`data-host とホストを自分のドメインに変更してください。

## 動作方法

1. SDKはid`cusdis_thread`の要素を見つけ、そこにウィジェットをマウントします。
2. SDKはウェブサイトのid(`data-app-id`)で、id`data-page-id`のページのコメントを要求します。
3. ユーザーがコメントを投稿すると、SDKはAPIサーバーにPOSTリクエストを送信します。

## 属性の参照

- `data-host` **(必須)** APIサーバーホスト
- `data-app-id` **(必須)** ウェブサイトID
- `data-page-id` **(必須)** 現在のページ ID(ページを識別するために使用されます。ページのスラッグやパーマリンクなどを使用してウェブサイト内で一意である必要があります。)
- `data-page-url` 現在のページのURL(ダッシュボードに表示されます)
- `data-page-title` 現在のページのタイトル(ダッシュボードに表示される)
- `data-theme`
  - `light` (デフォルト)
  - `auto` `prefers-color-scheme`によって自動的にテーマを設定する。
  - `dark`

## API

CusdisはいくつかのグローバルAPIを`window.CUSDIS`で公開しています：

#### window.CUSDIS.initial()

ウィジェットを初期化します。

#### window.CUSDIS.renderTo(target: HTMLElement)

ウィジェットを特定のDOM要素にレンダリングします。

#### window.CUSDIS.setTheme(theme: 'dark' | 'light' | 'auto')

手動でテーマを設定します。