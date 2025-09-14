import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="prose prose-lg mx-auto">
        <h1 className="text-3xl font-bold mb-8">プライバシーポリシー</h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <p className="text-sm text-yellow-800">
            <strong>注意：</strong>これはテスト用のサイトです。実際のサービス運用時には法律専門家にご相談ください。
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. 個人情報の収集について</h2>
          <p className="mb-4">当サイトでは、以下の個人情報を収集します：</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Google認証による情報（メールアドレス、氏名、プロフィール画像）</li>
            <li>投稿記事の内容および投稿日時</li>
            <li>サイト利用に関するログ情報</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. 個人情報の利用目的</h2>
          <p className="mb-4">収集した個人情報は、以下の目的で利用します：</p>
          <ul className="list-disc pl-6 mb-4">
            <li>サービスの提供・運営</li>
            <li>ユーザー認証および本人確認</li>
            <li>投稿記事の著者識別</li>
            <li>サービス向上のための統計・分析</li>
            <li>お問い合わせ対応</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. 個人情報の保管・管理</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>個人情報はSupabase Inc.（米国）のサーバーにて暗号化して保存</li>
            <li>適切なセキュリティ対策により不正アクセスを防止</li>
            <li>法令に基づく場合を除き、第三者への提供は行いません</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Cookie等の利用</h2>
          <p className="mb-4">
            当サイトでは、認証状態の維持のためCookieを使用します。
            ブラウザ設定によりCookieを無効にできますが、サービスの一部機能が制限される場合があります。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. 個人情報の開示・削除</h2>
          <p className="mb-4">
            ご本人からの個人情報の開示・修正・削除の請求については、
            本人確認を行った上で合理的な期間内に対応します。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. お問い合わせ</h2>
          <p className="mb-4">
            プライバシーに関するお問い合わせは、以下までご連絡ください：<br />
            <span className="text-gray-600">[テスト用サイトのためお問い合わせ先は設定されていません]</span>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. プライバシーポリシーの変更</h2>
          <p className="mb-4">
            本ポリシーは法令の変更等により予告なく変更する場合があります。
            変更後のポリシーは当サイト掲載をもって効力を生じるものとします。
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            制定日：2024年9月14日<br />
            最終更新：2024年9月14日
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}