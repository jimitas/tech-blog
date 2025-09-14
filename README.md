# Tech Blog Platform

Next.js + Supabase + Vercelで構築したシンプルな技術記事投稿プラットフォーム

![Tech Blog Platform](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?logo=supabase)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?logo=vercel)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss)

## 🚀 Demo

[ライブデモを見る](https://tech-blog-your-project.vercel.app) （デプロイ後にURLを更新）

## 📖 概要

このプロジェクトは、初心者がAIコーディングを学習できるよう設計された技術記事投稿プラットフォームです。Zen/Qiitaのようなシンプルなインターフェースで、記事の投稿・編集・削除が可能です。

### 主な特徴

- 🔐 **Google認証** - ワンクリックでログイン
- ✏️ **Markdown対応** - 技術記事に最適
- 📱 **レスポンシブ** - モバイルファーストデザイン
- ⚡ **高速** - Next.js App Routerによる最適化
- 🔒 **セキュア** - Supabase RLSによる適切なアクセス制御

## 🛠 技術スタック

| 技術 | 用途 | バージョン |
|------|------|-----------|
| [Next.js](https://nextjs.org/) | フロントエンドフレームワーク | 15.x |
| [Supabase](https://supabase.com/) | バックエンド・データベース | Latest |
| [TypeScript](https://www.typescriptlang.org/) | 型安全性 | 5.x |
| [Tailwind CSS](https://tailwindcss.com/) | スタイリング | 3.x |
| [React Markdown](https://github.com/remarkjs/react-markdown) | Markdownレンダリング | Latest |
| [Vercel](https://vercel.com/) | ホスティング | - |

## 🎯 機能

### ✅ 実装済み機能

- **認証システム**
  - Googleアカウントでのログイン/ログアウト
  - ユーザーセッション管理
- **記事管理**
  - 記事一覧表示（時系列順）
  - 記事詳細表示
  - 記事作成（Markdownエディタ）
  - カスタム表示名設定（記事投稿時）
  - 記事編集・削除（作者のみ）
- **UI/UX**
  - 完全レスポンシブデザイン（モバイル・タブレット・デスクトップ対応）
  - モバイルファーストアプローチ
  - タッチデバイス最適化
  - ダークモード対応準備
  - アクセシビリティ対応
- **法的ページ**
  - プライバシーポリシー
  - 利用規約

### 🔮 今後の拡張予定

- タグ機能
- 検索機能
- いいね・ブックマーク機能
- コメント機能
- 画像アップロード
- ユーザープロフィール詳細

## 🚦 はじめ方

### 前提条件

- Node.js 18.0以上
- npm または yarn
- Gitアカウント
- Supabaseアカウント
- Vercelアカウント（デプロイ時）

### クイックスタート

1. **リポジトリのクローン**
   ```bash
   git clone https://github.com/yourusername/tech-blog.git
   cd tech-blog
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   ```

3. **環境変数の設定**
   ```bash
   cp .env.example .env.local
   # .env.localファイルを編集してSupabase認証情報を設定
   ```

4. **開発サーバーの起動**
   ```bash
   npm run dev
   ```

5. **ブラウザでアクセス**
   [http://localhost:3000](http://localhost:3000)

## 📋 詳細セットアップ

初回セットアップや本番デプロイについては、以下のドキュメントを参照してください：

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - 詳細な環境構築手順
- **[REQUIREMENTS.md](./REQUIREMENTS.md)** - 機能仕様と技術要件

## 🏗 プロジェクト構造

```
tech-blog/
├── src/
│   ├── app/                    # App Router（Next.js 13+）
│   │   ├── (pages)/           # ページコンポーネント
│   │   │   ├── articles/      # 記事関連ページ
│   │   │   ├── privacy/       # プライバシーポリシー
│   │   │   └── terms/         # 利用規約
│   │   ├── globals.css        # グローバルスタイル
│   │   ├── layout.tsx         # ルートレイアウト
│   │   └── page.tsx          # ホームページ
│   ├── components/            # 再利用可能コンポーネント
│   │   ├── articles/         # 記事関連コンポーネント
│   │   ├── auth/             # 認証関連コンポーネント
│   │   └── layout/           # レイアウトコンポーネント
│   └── lib/                  # ユーティリティ・設定
│       └── supabase.ts       # Supabaseクライアント設定
├── public/                   # 静的ファイル
├── database.sql             # データベーススキーマ
├── SETUP_GUIDE.md          # セットアップガイド
├── REQUIREMENTS.md         # 要件定義書
└── README.md              # このファイル
```

## 💻 開発

### 利用可能なコマンド

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド |
| `npm run start` | 本番サーバー起動 |
| `npm run lint` | ESLintでコード検査 |
| `npm run type-check` | TypeScript型検査 |

### 開発ガイドライン

- **コンポーネント設計**: 再利用性を重視したコンポーネント分割
- **レスポンシブデザイン**: モバイルファーストでTailwindのブレークポイントを活用
- **型安全性**: TypeScriptの型を活用した堅牢な実装
- **アクセシビリティ**: WCAG 2.1 AA準拠を目指す
- **パフォーマンス**: Next.jsの最適化機能を活用
- **セキュリティ**: Supabase RLSによる適切なアクセス制御

## 🔒 セキュリティ

- **認証**: Supabase Authによる安全な認証
- **認可**: Row Level Security (RLS) によるデータアクセス制御
- **環境変数**: 秘匿情報の適切な管理
- **HTTPS**: 本番環境でのSSL/TLS暗号化

## 🚀 デプロイ

### Vercelへのデプロイ

1. [Vercel](https://vercel.com)にログイン
2. GitHubリポジトリを連携
3. 環境変数を設定
4. デプロイ実行

詳細な手順は[SETUP_GUIDE.md](./SETUP_GUIDE.md)を参照してください。

## 🤝 コントリビューション

プルリクエストや Issue の作成を歓迎します。大きな変更を行う場合は、まず Issue で相談してください。

### 開発の流れ

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](./LICENSE) ファイルを参照してください。

## 🙋‍♂️ サポート

質問や問題がある場合は、以下の方法でお気軽にお問い合わせください：

- [Issues](https://github.com/yourusername/tech-blog/issues) - バグ報告や機能要望
- [Discussions](https://github.com/yourusername/tech-blog/discussions) - 一般的な質問や議論

## 📚 学習リソース

このプロジェクトを通じて学べる技術：

- **Next.js App Router** - 最新のReactフレームワーク
- **Supabase** - Firebase代替のオープンソースBaaS
- **TypeScript** - 型安全なJavaScript開発
- **Tailwind CSS** - ユーティリティファーストCSS
- **Vercel** - 現代的なWebアプリケーションのデプロイ

---

⭐ このプロジェクトが役に立った場合は、スターをつけていただけると嬉しいです！