# GitHub Pages デプロイ手順

## 問題の原因

GitHub Pagesで画面が真っ白になる主な原因：

1. **base pathの設定不足**: GitHub Pagesは `/business-accounting/` というサブディレクトリでホスティングされる
2. **アセットパスの問題**: 絶対パス（`/src/main.ts`）がサブディレクトリで動作しない
3. **SPAのルーティング問題**: 404エラー時にindex.htmlにリダイレクトする必要がある

## 修正内容

### 1. vite.config.ts に base パスを追加 ✅

```typescript
export default defineConfig({
  plugins: [vue()],
  base: '/business-accounting/',
})
```

### 2. 404.html を作成 ✅

SPAのルーティングをサポートするため、404.htmlでindex.htmlにリダイレクト

### 3. GitHub Actions ワークフロー ✅

自動デプロイ用のワークフローを作成

## デプロイ方法

### 方法1: GitHub Actions（推奨）

1. リポジトリの Settings → Pages に移動
2. Source を「GitHub Actions」に設定
3. `main` ブランチにプッシュすると自動デプロイ

### 方法2: 手動デプロイ

```bash
cd business-accounting-vue3-ts
npm run build

# distフォルダの内容をgh-pagesブランチにデプロイ
# または、GitHub Pagesの設定で /docs フォルダを指定して dist を docs にリネーム
```

### 方法3: gh-pages パッケージを使用

```bash
npm install --save-dev gh-pages

# package.jsonに追加
"scripts": {
  "deploy": "npm run build && gh-pages -d dist -t true"
}

# デプロイ実行
npm run deploy
```

## 確認事項

デプロイ後、以下を確認：

1. ✅ `https://naokimm.github.io/business-accounting/` でアクセス可能
2. ✅ 画面が正しく表示される（真っ白でない）
3. ✅ アセット（CSS、JS、画像）が正しく読み込まれる
4. ✅ ブラウザのコンソールにエラーがない

## トラブルシューティング

### 画面が真っ白な場合

1. ブラウザの開発者ツール（F12）でコンソールエラーを確認
2. Networkタブでアセットの読み込み状況を確認
3. `vite.config.ts` の `base` パスが正しいか確認
4. ビルドが正しく実行されているか確認（`dist` フォルダの内容）

### 404エラーが発生する場合

- `404.html` が `public` フォルダに存在するか確認
- GitHub Pagesの設定で「Custom 404」が有効になっているか確認

### アセットが読み込まれない場合

- `vite.config.ts` の `base` パスが `/business-accounting/` になっているか確認
- ビルド後の `dist/index.html` でアセットパスが相対パスになっているか確認

