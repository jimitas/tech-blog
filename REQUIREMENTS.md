# Tech Blog Platform - 要件定義書

## 📋 プロジェクト概要

### プロジェクト名
Tech Blog Platform

### 目的
初心者がAIコーディングを学習できる技術記事投稿プラットフォームの構築

### ターゲット
- プログラミング初心者
- AIツールを活用した開発を学びたい開発者
- 技術記事を投稿・共有したいユーザー

## 🎯 機能要件

### 1. 認証システム

#### 1.1 ログイン機能
- **Google OAuth認証**
  - ワンクリックでのGoogleアカウント認証
  - Supabase Authを使用した実装
  - セッション管理（ログイン状態の維持）

#### 1.2 ユーザー管理
- **ユーザー情報取得**
  - Googleプロフィールからの基本情報取得（名前、メールアドレス、プロフィール画像）
  - ユーザー名表示機能
- **ログアウト機能**
  - セッション終了
  - ログイン画面への遷移

### 2. 記事管理システム

#### 2.1 記事一覧機能
- **表示機能**
  - 投稿された全記事の一覧表示
  - 時系列順（新しい記事が上位）
  - レスポンシブ対応
- **記事情報表示**
  - 記事タイトル
  - 投稿者名
  - 投稿日時
  - 更新日時（編集された場合）

#### 2.2 記事詳細機能
- **表示機能**
  - 個別記事の詳細表示
  - Markdownレンダリング
  - 投稿者情報表示
- **操作ボタン**
  - 編集ボタン（作者のみ）
  - 削除ボタン（作者のみ）

#### 2.3 記事作成機能
- **認証制御**
  - ログイン必須
  - 未ログインユーザーはログインページへリダイレクト
- **入力フォーム**
  - タイトル入力欄（必須）
  - 表示名入力欄（ログイン名が初期値、必須）
  - 内容入力欄（Markdownエディタ、必須）
  - プレビュー機能
- **保存機能**
  - データベースへの記事保存
  - 投稿後は記事詳細ページへリダイレクト

#### 2.4 記事編集機能
- **認証・認可制御**
  - ログイン必須
  - 記事の作者のみ編集可能
  - 作者以外はアクセス拒否
- **編集フォーム**
  - 既存データの自動入力
  - タイトル・内容の編集
  - プレビュー機能
- **更新機能**
  - データベースでの記事更新
  - 更新日時の自動記録

#### 2.5 記事削除機能
- **認証・認可制御**
  - 記事の作者のみ削除可能
  - 削除確認ダイアログの表示
- **削除処理**
  - データベースからの記事削除
  - 記事一覧ページへリダイレクト

### 3. UI/UX機能

#### 3.1 レスポンシブデザイン
- **ブレークポイント設計**
  - Mobile First: 320px〜 (デフォルト)
  - Small: 640px以上 (sm:)
  - Medium: 768px以上 (md:)
  - Large: 1024px以上 (lg:)
  - Extra Large: 1280px以上 (xl:)
- **デバイス対応**
  - スマートフォン (320px - 639px): 縦並びレイアウト、全幅ボタン、読みやすい文字サイズ
  - タブレット (640px - 1023px): 適応的レイアウト
  - デスクトップ (1024px以上): 横並びレイアウト、最適なスペース活用
- **タッチデバイス最適化**
  - ボタンのタップ領域最小44px
  - スワイプジェスチャー対応準備
  - ピンチズーム対応

#### 3.2 ナビゲーション
- **ヘッダー**
  - サイトロゴ（ホームリンク）
  - 記事一覧リンク
  - 記事作成ボタン（ログイン時のみ）
  - 認証ボタン（ログイン/ログアウト）
- **フッター**
  - プライバシーポリシーリンク
  - 利用規約リンク

#### 3.3 アクセシビリティ
- **キーボード操作対応**
- **スクリーンリーダー対応**
- **カラーコントラスト確保** (特にモバイルでの文字視認性)

#### 3.4 ブラウザ互換性対応
- **LINE内蔵ブラウザ対応**
  - User Agent検知による自動識別
  - 警告バナー表示機能
  - 外部ブラウザ誘導メッセージ
- **その他アプリ内ブラウザ対応準備**

### 4. 法的対応

#### 4.1 プライバシーポリシー
- **Google認証情報の取り扱い**
- **データ保存・利用目的の明記**
- **Cookie利用の説明**
- **テスト環境での免責事項**

#### 4.2 利用規約
- **サービス利用条件**
- **禁止事項の明記**
- **免責事項**
- **アカウント管理**

## 🏗 技術要件

### システム構成

#### フロントエンド
- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS (レスポンシブ対応)
- **レスポンシブ手法**: Mobile-First CSS、Flexbox、CSS Grid
- **コンポーネント**: React Server Components / Client Components

#### バックエンド
- **BaaS**: Supabase
- **データベース**: PostgreSQL (Supabaseマネージド)
- **認証**: Supabase Auth
- **API**: Supabase RESTful API

#### インフラ
- **ホスティング**: Vercel
- **CDN**: Vercel Edge Network
- **SSL/TLS**: 自動設定（Vercel）

### データベーススキーマ

#### Users Table (Supabase Auth管理)
```sql
-- Supabase Authで自動管理
auth.users (
  id UUID PRIMARY KEY,
  email VARCHAR,
  user_metadata JSONB, -- 名前、プロフィール画像等
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

#### Articles Table
```sql
CREATE TABLE public.articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) ポリシー
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- 読み取り：全ユーザー
CREATE POLICY "Articles are viewable by everyone" ON articles
  FOR SELECT USING (true);

-- 作成：認証済みユーザーのみ
CREATE POLICY "Users can create articles" ON articles
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- 更新：作者のみ
CREATE POLICY "Users can update their own articles" ON articles
  FOR UPDATE USING (auth.uid() = author_id);

-- 削除：作者のみ
CREATE POLICY "Users can delete their own articles" ON articles
  FOR DELETE USING (auth.uid() = author_id);
```

### API仕様

#### 認証API (Supabase Auth)
- `POST /auth/v1/token?grant_type=id_token` - Google OAuth認証
- `POST /auth/v1/logout` - ログアウト
- `GET /auth/v1/user` - ユーザー情報取得

#### 記事API (Supabase REST API)
- `GET /rest/v1/articles` - 記事一覧取得
- `GET /rest/v1/articles?id=eq.{id}` - 記事詳細取得
- `POST /rest/v1/articles` - 記事作成
- `PATCH /rest/v1/articles?id=eq.{id}` - 記事更新
- `DELETE /rest/v1/articles?id=eq.{id}` - 記事削除

### セキュリティ要件

#### 認証・認可
- **Google OAuth 2.0** による安全な認証
- **JWT トークン** によるセッション管理
- **Row Level Security (RLS)** によるデータアクセス制御

#### データ保護
- **HTTPS通信** の強制
- **環境変数** による秘匿情報管理
- **CSRF保護** (Next.js標準機能)
- **XSS対策** (React標準機能)

#### プライバシー
- **最小権限の原則** によるデータアクセス
- **データ匿名化** の検討
- **GDPR対応** のプライバシーポリシー

### パフォーマンス要件

#### 表示速度
- **初回表示**: 3秒以内
- **ページ遷移**: 1秒以内
- **記事検索**: 2秒以内

#### 最適化
- **Next.js最適化機能** の活用
  - 自動コード分割
  - 画像最適化
  - フォント最適化
- **Vercel Edge** による高速配信
- **データベースインデックス** の適切な設定

### ブラウザ対応

#### サポートブラウザ
- **Chrome** 100+
- **Firefox** 100+
- **Safari** 15+
- **Edge** 100+

#### モバイル対応
- **iOS Safari** 15+
- **Android Chrome** 100+
- **LINE内蔵ブラウザ対応** (外部ブラウザ誘導機能)

## 🚀 開発・運用要件

### 開発環境
- **Node.js** 18.0以上
- **npm/yarn** 最新版
- **Git** 最新版
- **VS Code** (推奨)

### 品質保証
- **TypeScript** による型チェック
- **ESLint** によるコード品質チェック
- **Prettier** によるコードフォーマット
- **テスト** (今後実装予定)

### デプロイメント
- **Git-based デプロイ** (Vercel)
- **プレビュー環境** の自動生成
- **本番環境** の自動デプロイ

### モニタリング
- **Vercel Analytics** による基本解析
- **エラーログ** の収集
- **パフォーマンス監視**

## 🔮 将来の拡張計画

### Phase 2: 検索・フィルタ機能
- 記事検索機能
- タグ機能
- カテゴリ分類

### Phase 3: ソーシャル機能
- いいね機能
- ブックマーク機能
- コメント機能

### Phase 4: 高度な機能
- 画像アップロード
- ユーザープロフィール詳細
- フォロー機能
- 通知機能

### Phase 5: 管理・運用機能
- 管理者ダッシュボード
- 記事審査機能
- 分析ダッシュボード
- API レート制限

## 📊 成功指標 (KPI)

### ユーザビリティ
- **ユーザー登録率**: 60%以上
- **記事投稿率**: 30%以上
- **セッション継続時間**: 3分以上

### パフォーマンス
- **ページ表示速度**: 3秒以内
- **稼働率**: 99%以上
- **エラー率**: 1%以下

### 学習効果
- **初心者完走率**: 80%以上
- **技術習得度**: アンケートで4/5以上
- **プロジェクト継続率**: 70%以上

---

この要件定義書は、プロジェクトの進行に応じて継続的に更新されます。