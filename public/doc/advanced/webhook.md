# Webhook

メールによる新着コメント通知の他に、Webhookも提供しています。

## 有効にする

プロジェクトのWebhookを有効にするには、`Project`->`Settings`でWebhookのURLを保存し、トグルスイッチをオンにします。

![](../images/enable_webhook.png ':size=500')

## リファレンス

### 新しいコメント

新しいコメントが入力されると、Cusdisはあなたのwebhookに`POST`リクエストを送信します：

```js
{
  "type": "type": "new_comment",
  "data": {
    "by_nickname": "xxx",
    "by_email": "xxx": "xxx",
    "content": "xxx",
    "page_id": "xxx",
    "page_title": "xxx", // ページタイトル。
    "project_title": "haha", // プロジェクトのタイトル
    "approve_link": "" // ログインせずにこのコメントを承認するにはこのリンクを使う
  }
}
```