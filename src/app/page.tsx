import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import WriteArticleButton from '@/components/layout/WriteArticleButton'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching articles:', error)
  }

  return (
    <div className="space-y-8">
      {/* ヒーローセクション */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 sm:p-8 text-white">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Tech Blog</h1>
            <p className="text-blue-100 text-sm sm:text-base">技術記事を投稿・共有するプラットフォーム</p>
          </div>
          <WriteArticleButton
            className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 font-medium w-full sm:w-auto text-center shadow-lg transition-all hover:shadow-xl"
          />
        </div>
      </div>

      {/* 記事一覧ヘッダー */}
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">最新の記事</h2>
        {articles && articles.length > 0 && (
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
            {articles.length}件
          </span>
        )}
      </div>

      <div className="space-y-4 sm:space-y-6">
        {articles && articles.length > 0 ? (
          articles.map((article) => (
            <article
              key={article.id}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group"
            >
              <Link href={`/articles/${article.id}`} className="block">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    {article.title.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-blue-600 mb-2 line-clamp-2 transition-colors">
                      {article.title}
                    </h2>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        {article.author_name || 'Unknown User'}
                      </span>
                      <span>•</span>
                      <time dateTime={article.created_at}>
                        {new Date(article.created_at).toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 line-clamp-3 text-sm sm:text-base leading-relaxed">
                  {article.content.length > 200
                    ? `${article.content.substring(0, 200)}...`
                    : article.content
                  }
                </p>
              </Link>
              <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full">記事</span>
                </div>
                <span className="text-blue-600 text-sm group-hover:text-blue-700 transition-colors">
                  読む →
                </span>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-16 px-4">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">まだ記事がありません</h3>
              <p className="text-gray-500 mb-6">最初の記事を投稿して、このプラットフォームを盛り上げましょう！</p>
              <WriteArticleButton
                text="最初の記事を書く"
                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium w-full sm:w-auto shadow-lg transition-all hover:shadow-xl"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}