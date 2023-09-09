# Cusdisへの貢献

時間を割いていただきありがとうございます！

このガイドを読めば、Cusdisをローカルマシンで動かして開発を始める方法がすべてわかります。

## 開発サーバーの起動

まず、`.env`ファイルを作成します：

```shell
DB_URL=file:./db.sqlite
USERNAME=admin
PASSWORD=パスワード
JWT_SECRET=ofcourseistillloveyou
```

```bash
# 依存関係をインストールする
$ yarn

# 開発サーバーを起動する
$ yarn dev
```

http://localhost:3000 を開き、`admin`と`password`でサインインする。

### PostgreSQL を使う

`yarn dev`はデフォルトでSQLiteを使用しています。PostgreSQLで開発したい場合は、まず`.env`の`DB_URL`をあなたのDB接続URLに変更してください：

```shell
# .env
DB_URL=postgres://xxx
...
```

それから`yarn dev:pg`を使用して開発サーバを起動します。

## 開発ウィジェット

```bash
yarn widget
```

ウィジェットのデモは http://localhost:3001 で動作します。

`widget/index.html`のウィジェットの属性を変更する。(テスト用に何かを変更するだけなら、このファイルをコミットしないでください)

## スキーマの変更

データベーススキーマは`prisma/$DB_TYPE/schema.prisma`で定義される。

### データベースの移行を生成する

一般的に、新機能を投稿する際にマイグレーションを生成する必要はありません。PRを作成すれば、コアチームのメンバーがマイグレーションを行ってくれます。