# Tech Blog Platform Requirements

## Overview
シンプルな技術記事投稿プラットフォーム（Zen/Qiita風）をNext.js App Router + Supabaseで構築する。

## Technical Stack
- **Frontend**: Next.js 15 (App Router)
- **Backend**: Supabase
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth (Email + Google OAuth)
- **Styling**: Tailwind CSS
- **Content Format**: Markdown

## Core Features

### Authentication
- メール認証によるサインアップ/ログイン
- Google OAuth認証
- Supabase Authを使用

### Article Management
- **記事作成**: Markdownエディタで記事作成
- **記事編集**: 自分の記事のみ編集可能
- **記事削除**: 自分の記事のみ削除可能
- **記事一覧**: 全ユーザーの記事を時系列で表示
- **記事詳細**: 個別記事の表示

### Basic Features
- **タイトル**: 記事のタイトル
- **本文**: Markdown形式
- **投稿者**: ユーザー名表示
- **作成日時**: 投稿日時表示
- **更新日時**: 編集日時表示

## Database Schema

### Users Table (Supabase Auth管理)
- id (UUID)
- email
- name (表示名)
- created_at

### Articles Table
```sql
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Page Structure
1. **Home Page** (`/`) - 記事一覧
2. **Article Detail** (`/articles/[id]`) - 記事詳細
3. **Create Article** (`/articles/new`) - 記事作成（要認証）
4. **Edit Article** (`/articles/[id]/edit`) - 記事編集（要認証・作者のみ）
5. **Login** (`/login`) - ログイン
6. **Profile** (`/profile`) - ユーザープロフィール（要認証）

## MVP Features (Phase 1)
- [x] Next.js プロジェクト作成
- [ ] Supabase設定
- [ ] 認証システム（Email + Google）
- [ ] 記事CRUD機能
- [ ] Markdownレンダリング
- [ ] 基本的なUI/レスポンシブデザイン

## Future Enhancements (Phase 2以降)
- タグ機能
- 検索機能
- いいね機能
- コメント機能
- 画像アップロード
- ユーザープロフィール詳細