# Docker

```bash
docker run \
  -d \
  -e USERNAME=admin \
  -e PASSWORD=password \
  -e JWT_SECRET=ofcourseistillloveyou \
  -e DB_URL=file:/data/db.sqlite \
  -e NEXTAUTH_URL=http://IP_ADDRESS_OR_DOMAIN \
  -p 3000:3000 \
  -v /data:/data \
  djyde/cusdis
```

> `http://IP_ADDRESS_OR_DOMAIN`を自分のマシンのホストまたはドメインに変更してください。

次に`http://IP_ADDRESS_OR_DOMAIN`にアクセスします。

## 環境変数

- `USERNAME` (必須) ログインするためのユーザ名
- `PASSWORD` (必須) ログイン時のパスワード
- `DB_URL` (必須) データを保存する場所。
  - SQLiteを使用する場合は、`file:/data/db.sqlite`のように`file:`というプレフィックスを付けます。
  - pgsqlを使用している場合は、pgsqlの接続URLを設定します。
  - mysqlを使用している場合は、mysqlの接続URLを指定します。
- `NEXTAUTH_URL` (必須) マシンのホスト名 (IPアドレスまたは`https://foo.com`のようなドメイン名)。
- `HOST` (デフォルト:`https://cusdis.com`) ホスト(`https://foo.com` のようなIPアドレスまたはドメイン)を入力します。　承認リンクのリダイレクトアドレスに影響します。
- `JWT_SECRET` JWTのシークレット
- `DB_TYPE`
  - `sqlite` (デフォルト)
  - `pgsql`
  - `mysql`

### PostgreSQL (オプション)

SQLiteの代わりに既存のpgsqlにCusdisを接続することができる：

```bash
docker run
  -d \
  -e USERNAME=djyde  \
  -e PASSWORD=password \
  -e JWT_SECRET=ofcourseistillloveyou  \
  -e DB_TYPE=pgsql \
  -e DB_URL=YOUR_PGSQL_URL \
  -e NEXTAUTH_URL=http://IP_ADDRESS_OR_DOMAIN  \
  -p 3000:3000 \
  djyde/cusdis
```

または、`docker compose`を使用して新しいpgsqlを使用することもできます。

`docker-compose.yaml`を作成してください：


```yml
version: "3.9"
services:
  cusdis:
    image: "djyde/cusdis"
    ports:
      - "3000:3000"
    environment:
      - USERNAME=admin
      - PASSWORD=password
      - JWT_SECRET=ofcourseistillloveyou
      - NEXTAUTH_URL=http://IP_ADDRESS_OR_DOMAIN
      - DB_TYPE=pgsql
      - DB_URL=postgresql://cusdis:password@pgsql:5432/cusdis
  pgsql:
    image: "postgres:13"
    volumes:
      - "./data:/var/lib/postgresql/data"
    environment:
      - POSTGRES_USER=cusdis
      - POSTGRES_DB=cusdis
      - POSTGRES_PASSWORD=password
```

> `http://IP_ADDRESS_OR_DOMAIN`を自分のマシンのIPアドレスまたはドメインに変更してください。

次に`docker-compose up`を実行する。