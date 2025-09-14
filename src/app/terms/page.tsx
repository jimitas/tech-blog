import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="prose prose-lg mx-auto">
        <h1 className="text-3xl font-bold mb-8">利用規約</h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <p className="text-sm text-yellow-800">
            <strong>注意：</strong>これはテスト用のサイトです。実際のサービス運用時には法律専門家にご相談ください。
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. サービス概要</h2>
          <p className="mb-4">
            本サービスは、ユーザーが記事を投稿・共有できるプラットフォームです。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. 利用条件</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>13歳以上であること</li>
            <li>正確な情報を提供すること</li>
            <li>法令および本規約を遵守すること</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. 禁止事項</h2>
          <p className="mb-4">以下の行為を禁止します：</p>
          <ul className="list-disc pl-6 mb-4">
            <li>違法・有害なコンテンツの投稿</li>
            <li>他者の著作権侵害</li>
            <li>スパム・迷惑行為</li>
            <li>サービスの妨害行為</li>
            <li>虚偽の情報の投稿</li>
            <li>他のユーザーへの嫌がらせ</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. コンテンツの取り扱い</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>投稿コンテンツの著作権は投稿者に帰属</li>
            <li>当サイトは投稿コンテンツの表示・配信権限を有する</li>
            <li>規約違反コンテンツは予告なく削除する場合があります</li>
            <li>投稿者は自己の責任においてコンテンツを管理するものとします</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. 免責事項</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>サービスの継続性は保証しません</li>
            <li>コンテンツの正確性・安全性は保証しません</li>
            <li>サービス利用による損害について一切責任を負いません</li>
            <li>他のユーザーの投稿内容について責任を負いません</li>
            <li>システムの不具合やデータ消失について責任を負いません</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. アカウントの管理</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>アカウント情報の管理はユーザーの責任とします</li>
            <li>規約違反が確認された場合、アカウントを停止する場合があります</li>
            <li>長期間利用がない場合、アカウントを削除する場合があります</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. サービスの変更・終了</h2>
          <p className="mb-4">
            事前通知により、サービス内容の変更・終了を行う場合があります。
            サービス終了時のデータ保護については、可能な範囲で事前にお知らせします。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. 規約の変更</h2>
          <p className="mb-4">
            本規約は、法令の変更やサービス内容の変更により予告なく変更する場合があります。
            変更後の規約は、当サイトに掲載された時点で効力を生じるものとします。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. 準拠法・管轄</h2>
          <p className="mb-4">
            本規約は日本法に準拠し、東京地方裁判所を専属的合意管轄裁判所とします。
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
          >
            <div className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              ホームに戻る
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}