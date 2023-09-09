# 通知

#ホスティングサービス

[ホスティングサービス](https://cusdis.com/dashboard)にはEメール通知が付属しています：

![](../images/email.png ':size=600')

メールの内容にもあるように、ログインせずにコメントを承認することもできます。

### プロジェクトごとに通知を無効にする

`Websites`->`Project`->`Settings`で、特定のプロジェクトの通知を無効にすることができます：

![](../images/disable-notification-in-project.png ':size=400')

### 通知設定

`User`->`Settings`で通知設定を変更することができます：

![](../images/advance-notification-settings.png ':size=400')

## セルフホスト

セルフホストのCusdisでメール通知を有効にするには、環境変数でSMTPの設定を行う必要があります：

- `SMTP_HOST` **必須** SMTPホスト
- `SMTP_USER` **必須** SMTP ユーザ名
- `SMTP_PASSWORD` **必須** SMTP パスワード
- `SMTP_SENDER` **必須** 送信者のメールアドレス
- `SMTP_PORT` デフォルト:587 SMTP ポート
- `SMTP_SECURE` デフォルト:`true` SMTPセキュアの有効/無効

> メール本文に正しい承認リンクと配信停止リンクを表示するためには、`HOST`を自分のドメイン名に設定してください。

### SMTP 設定例

#### Gmail

まず、[Googleアカウントセキュリティ](https://myaccount.google.com/security)にアクセスし、二要素認証が有効になっていることを確認してください。
次に、[アプリケーションパスワード](https://myaccount.google.com/apppasswords)にアクセスし、Cusdis用の新しいパスワードを作成します。設定は以下のようになります。:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=<あなたのGmailアドレス>
SMTP_PASSWORD=<アプリ パスワード>
SMTP_SENDER=<あなたのGmailアドレス>
```

> 送信者の電子メールはログインユーザーと同じでなければなりませんが、`John Doe <john.doe@gmail.com>`で表示名を与えることができます。他のSMTPサービスでも同じです。

#### Sendgrid

```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=apikey
SMTP_PASSWORD=<SendgridのAPIキー>
SMTP_SENDER=<あなたのメールアドレス>
```