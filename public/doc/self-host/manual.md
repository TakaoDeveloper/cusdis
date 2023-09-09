# 手動インストール

システムにNode.jsとyarnがインストールされていることを確認し、リポジトリをクローンする

```bash
$ git clone https://github.com/djyde/cusdis.git
$ cd cusdis
$ yarn install
```
プロジェクトのルート下に、環境変数の設定を記述した`.env`ファイルを置きます。

```
USERNAME=admin
PASSWORD=password
JWT_SECRET=ofcourseistillloveyou
NEXTAUTH_URL=http://IP_ADDRESS_OR_DOMAIN
HOST=http://IP_ADDRESS_OR_DOMAIN
DB_TYPE=sqlite
DB_URL=file:./data.db
```

その後、アプリケーションをビルドして実行します。

```bash
$ yarn run build:without-migrate
$ yarn run start:with-migrate
```

これでアプリケーションは`3000`ポートで動作するようになり、`http://localhost:3000`からアクセスできるようになります。

アプリケーションを提供するにはNginxが必要かもしれません。

```nginx
...
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_pass_header Authorization;
    proxy_pass_header WWW-Authenticate;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
...
```
