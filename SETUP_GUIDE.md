# 記事投稿サイト構築ガイド（初心者向け）

このドキュメントは、Next.js + Supabase + Vercelを使用した記事投稿サイトの構築手順を詳しく説明します。

## 目次
1. [プロジェクトの初期設定](#1-プロジェクトの初期設定)
2. [Supabaseとの連携](#2-supabaseとの連携)
3. [環境変数の設定](#3-環境変数の設定)
4. [依存関係のインストール](#4-依存関係のインストール)
5. [Vercelへのデプロイ](#5-vercelへのデプロイ)
6. [トラブルシューティング](#6-トラブルシューティング)

## 1. プロジェクトの初期設定

### Next.jsプロジェクトの作成
```bash
npx create-next-app@latest tech-blog --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd tech-blog
```

### 基本的なファイル構造
```
tech-blog/
├── src/
│   ├── app/
│   │   ├── articles/
│   │   ├── new/
│   │   └── layout.tsx
│   ├── components/
│   │   └── articles/
│   └── lib/
│       └── supabase.ts
├── package.json
├── .env.local
└── .gitignore
```

## 2. Supabaseとの連携

### 2.1 Supabaseプロジェクトの作成
1. [Supabase](https://app.supabase.com)にアクセス
2. 「New Project」をクリック
3. プロジェクト名、データベースパスワードを設定
4. リージョンを選択（Japan (Tokyo)推奨）
5. 「Create new project」をクリック

### 2.2 データベーステーブルの作成
Supabase Dashboard → SQL Editor → New Query で以下を実行：

```sql
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) の有効化
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- ポリシーの設定（全てのユーザーが読み取り可能）
CREATE POLICY "Articles are viewable by everyone" ON articles
  FOR SELECT USING (true);

-- 認証済みユーザーのみ記事作成可能
CREATE POLICY "Users can create articles" ON articles
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- 著者のみ自分の記事を更新・削除可能
CREATE POLICY "Users can update their own articles" ON articles
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own articles" ON articles
  FOR DELETE USING (auth.uid() = author_id);
```

### 2.3 Google認証の設定
1. Supabase Dashboard → Authentication → Providers
2. Googleプロバイダーを有効化
3. [Google Cloud Console](https://console.cloud.google.com/)でOAuthクライアントIDを作成
4. 承認済みリダイレクトURIに以下を追加：
   ```
   https://[YOUR_PROJECT_REF].supabase.co/auth/v1/callback
   ```

### 2.4 本番環境での認証URL設定（重要！）
デプロイ後にGoogle認証が機能するよう、以下の設定を行ってください：

#### Supabaseでの設定
1. **Settings** → **General** → **General settings**
   - **Site URL**: `https://your-site-name.vercel.app` に設定

2. **Authentication** → **URL Configuration**
   - **Site URL**: `https://your-site-name.vercel.app` に設定
   - **Redirect URLs** に以下を追加：
     ```
     https://your-site-name.vercel.app/auth/callback
     https://your-site-name.vercel.app/**
     ```

#### Google Cloud Consoleでの追加設定
1. OAuth 2.0 Client IDsの設定を開く
2. **承認済みのリダイレクトURI**に本番サイトのコールバックURLも追加：
   ```
   https://your-site-name.vercel.app/auth/callback
   ```

## 3. 環境変数の設定

### 3.1 Supabase認証情報の取得
1. Supabase Dashboard → Settings → API
2. 以下の値をコピー：
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIs...` （長い文字列）

⚠️ **重要**: `service_role` キーではなく、必ず `anon` `public` キーを使用してください。

### 3.2 ローカル環境変数の設定
プロジェクトルートに `.env.local` ファイルを作成：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your_project_url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key_here
```

### 3.3 Supabaseクライアントの設定
`src/lib/supabase.ts` を作成：

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## 4. 依存関係のインストール

必要なパッケージをインストール：

```bash
# Supabaseクライアント
npm install @supabase/supabase-js

# Markdownレンダリング用
npm install react-markdown

# TailwindCSS Typography（オプション）
npm install @tailwindcss/typography
```

## 5. Vercelへのデプロイ

### 5.1 GitHubへのプッシュ
```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/tech-blog.git
git push -u origin main
```

### 5.2 Vercelでのプロジェクト作成
1. [Vercel Dashboard](https://vercel.com)にアクセス
2. 「New Project」をクリック
3. GitHubリポジトリを選択
4. 「Deploy」をクリック

### 5.3 Vercelでの環境変数設定
1. Vercel Dashboard → プロジェクト → Settings → Environment Variables
2. 以下の環境変数を追加：

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your_project_url.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your_anon_public_key_here` |

3. 全ての環境（Production, Preview, Development）にチェックを入れる
4. 「Add」をクリック
5. 設定後、「Redeploy」を実行

## 6. トラブルシューティング

### よくあるエラーと解決方法

#### エラー: `Module not found: Can't resolve '@supabase/supabase-js'`
**原因**: 依存関係がインストールされていない
**解決方法**:
```bash
npm install @supabase/supabase-js
git add package.json package-lock.json
git commit -m "Add @supabase/supabase-js dependency"
git push origin main
```

#### エラー: `Module not found: Can't resolve 'react-markdown'`
**原因**: react-markdownがインストールされていない
**解決方法**:
```bash
npm install react-markdown
git add package.json package-lock.json
git commit -m "Add react-markdown dependency"
git push origin main
```

#### エラー: Vercelが古いコミットをデプロイしている
**原因**: Vercelのキャッシュの問題
**解決方法**:
1. 空のコミットをプッシュしてデプロイを強制実行：
```bash
git commit --allow-empty -m "Trigger Vercel redeploy"
git push origin main
```

#### エラー: 環境変数が読み込まれない
**チェックポイント**:
- `.env.local` ファイルがプロジェクトルートにあるか
- 環境変数名が `NEXT_PUBLIC_` で始まっているか
- Vercelで環境変数が正しく設定されているか
- デプロイ後に再起動しているか

#### Google認証が機能しない
**チェックポイント**:
- Google Cloud ConsoleでOAuthクライアントが正しく設定されているか
- リダイレクトURIが正しく設定されているか
- Supabaseでプロバイダーが有効化されているか

#### エラー: Googleログイン後にlocalhostに飛ばされる
**原因**: SupabaseのSite URLがローカル開発用のままになっている
**解決方法**:
1. **Supabase Dashboard** → **Settings** → **General** → **Site URL**
   - `https://your-site-name.vercel.app` に変更

2. **Authentication** → **URL Configuration**
   - **Site URL**: `https://your-site-name.vercel.app`
   - **Redirect URLs**: `https://your-site-name.vercel.app/**` を追加

3. **Google Cloud Console** → OAuth設定
   - 承認済みリダイレクトURIに本番URLを追加
   - `https://your-site-name.vercel.app/auth/callback`

⚠️ **注意**: 設定変更後、反映まで数分かかる場合があります。

## セキュリティのベストプラクティス

1. **環境変数の管理**
   - `.env.local` は `.gitignore` で除外されている（デフォルト）
   - 本番環境では必ずVercelの環境変数を使用

2. **Row Level Security (RLS)**
   - データベースレベルでアクセス制御を実装
   - 認証されていないユーザーからのアクセスを制限

3. **API キーの使い分け**
   - フロントエンド: `anon` `public` キーのみ使用
   - バックエンド: `service_role` キー（APIルート内でのみ）

## まとめ

このガイドに従うことで、初心者でも記事投稿サイトを構築できます。最も重要なポイントは：

1. Supabaseの認証情報を正しく取得・設定すること
2. 環境変数をローカルとVercel両方で設定すること
3. 依存関係を適切にインストール・コミットすること
4. **本番デプロイ後は必ずSupabaseの認証URL設定を本番URLに変更すること**

### デプロイ後の最終チェックリスト
- [ ] Vercelで環境変数が設定されている
- [ ] SupabaseのSite URLが本番URLになっている
- [ ] Google Cloud ConsoleのリダイレクトURIに本番URLが含まれている
- [ ] Google認証が本番サイトで動作する
- [ ] 記事の投稿・編集・削除が動作する
- [ ] レスポンシブデザインが正常に動作する（下記テスト項目参照）

## レスポンシブデザインのテスト手順

### ブラウザでのテスト方法

#### 開発者ツールを使用したテスト
1. **Chrome DevTools**
   ```
   F12キー → デバイスツールバー切り替え（Ctrl+Shift+M）
   ```
2. **テストするデバイス**
   - iPhone SE (375x667)
   - iPhone 12 Pro (390x844)
   - iPad (768x1024)
   - iPad Pro (1024x1366)
   - デスクトップ (1920x1080)

#### 各ページのチェック項目

##### ヘッダー（全ページ共通）
- [ ] **モバイル**: ロゴとナビゲーションが縦並びで表示
- [ ] **デスクトップ**: ロゴとナビゲーションが横並びで表示
- [ ] ボタンが適切なサイズでタップしやすい

##### 記事一覧ページ
- [ ] **モバイル**:
  - ページタイトルと記事作成ボタンが縦並び
  - 記事作成ボタンが全幅表示
  - 記事カードの余白が適切
- [ ] **デスクトップ**:
  - ページタイトルと記事作成ボタンが横並び
  - 記事カードが読みやすい幅で表示

##### 記事詳細ページ
- [ ] **モバイル**:
  - タイトルが適切に改行される
  - メタ情報が縦並びで表示
  - 本文が読みやすい幅で表示
- [ ] **デスクトップ**:
  - メタ情報が横並びで表示
  - 本文の幅が適切

##### 記事作成・編集ページ
- [ ] **モバイル**:
  - フォーム要素が全幅表示
  - ボタンが縦並びで全幅
  - テキストエリアが使いやすいサイズ
- [ ] **デスクトップ**:
  - ボタンが横並びで表示
  - フォームが適切な幅

##### フッター（全ページ共通）
- [ ] **モバイル**: コンテンツが縦並びで中央揃え
- [ ] **デスクトップ**: コンテンツが横並びで両端揃え

### 実機テスト（推奨）

実際のデバイスでもテストすることを強く推奨します：

1. **スマートフォン**
   - iOS Safari
   - Android Chrome
2. **タブレット**
   - iPad Safari
   - Android Chrome

### パフォーマンステスト

レスポンシブデザインがパフォーマンスに与える影響をチェック：

```bash
# Lighthouse CLIを使用（オプション）
npm install -g lighthouse
lighthouse https://your-site-url.vercel.app --only-categories=performance --form-factor=mobile
```

### よくある問題と対処法

#### 問題: モバイルでボタンが小さすぎる
**対処法**: `min-h-[44px]` クラスを追加してタップ領域を確保

#### 問題: テキストが小さすぎて読めない
**対処法**: `text-sm sm:text-base` のようにレスポンシブなフォントサイズを設定

#### 問題: 横スクロールが発生する
**対処法**: `max-w-full` や `overflow-hidden` を適切な要素に追加

#### 問題: タッチでスクロールしにくい
**対処法**: `-webkit-overflow-scrolling: touch` を適用

何か問題が発生した場合は、エラーメッセージを確認し、上記のトラブルシューティングを参照してください。