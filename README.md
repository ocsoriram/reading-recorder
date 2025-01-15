# Reading Recorder

## 概要
Reading Recorderは、読んだ本の記録を管理するためのWebアプリケーションです。Google Books APIを利用して書籍情報を検索し、読了日と感想を記録することができます。

## 主な機能
- 書籍の検索（Google Books API連携）
- 読了日の記録
- 感想の記録
- 読書履歴の管理

## 技術スタック
- Next.js 15.1.3
- React 19.0.0
- TypeScript
- Tailwind CSS
- Prisma (SQLite)
- Jest (テスティング)

## 必要要件
- Node.js 18.0.0以上
- npm または yarn
- Google Books APIキー

## セットアップ手順

1. リポジトリのクローン
```bash
git clone [リポジトリURL]
cd reading-recorder
```

2. 依存関係のインストール
```bash
npm install
```

3. データベースのマイグレーション
```bash
npx prisma migrate dev
```

4. 開発サーバーの起動
```bash
npm run dev
```

5. ブラウザでアプリケーションにアクセス
```bash
http://localhost:3000
```

## 使い方
1. トップページでは、記録した本の一覧が表示されます
2. 「Search」から書籍を検索できます
3. 書籍を選択すると、読了日と感想を記録できます
4. 記録した内容は編集・削除が可能です

## ライセンス
MIT

## 作者
Seiya.K (react実践入門の巻末付録を参考にしています)

## 謝辞
- このプロジェクトはGoogle Books APIを使用しています
- Next.jsチームの素晴らしいフレームワークに感謝します