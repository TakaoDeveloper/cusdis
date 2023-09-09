# Vercel

Cusdis自体はNext.jsでビルドされているので、ワンクリックでVercelにデプロイできます。

> Vercelにデプロイする前に、接続可能なPostgreSQL接続URL(例:`postgresql://johndoe:randompassword@localhost:5432/mydb`)があることを確認してください。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdjyde%2Fcusdis&env=USERNAME,PASSWORD,DB_URL,JWT_SECRET&envDescription=Environment%20variables%20reference&envLink=https%3A%2F%2Fcusdis.com%2Fdoc)

最初のデプロイが成功したら、本番デプロイのドメイン(`https://foo.vercel.app`など)を取得し、環境変数`NEXTAUTH_URL`をこのドメインに設定します。

![](../images/y3FkAY.png ':size=800')

それからアプリケーションを再デプロイします

![](../images/redeploy.png ':size=400')


> ドメインを変更したら、`NEXTAUTH_URL`も変更してください。

## 環境変数の参照

- `USERNAME` サインインするユーザー名
- `PASSWORD` ログインするためのパスワード
- `DB_URL` 有効な postgresql 接続 URL (例:`postgresql://johndoe:randompassword@localhost:5432/mydb`)
- `JWT_SECRET` jwt トークンに署名するための秘密鍵。好きなように設定する。