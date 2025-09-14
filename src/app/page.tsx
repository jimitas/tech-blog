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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">記事一覧</h1>
        <WriteArticleButton
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        />
      </div>

      <div className="space-y-6">
        {articles && articles.length > 0 ? (
          articles.map((article) => (
            <article
              key={article.id}
              className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <Link href={`/articles/${article.id}`}>
                <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 mb-2">
                  {article.title}
                </h2>
              </Link>
              <p className="text-gray-600 line-clamp-3 mb-4">
                {article.content.length > 200
                  ? `${article.content.substring(0, 200)}...`
                  : article.content
                }
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>
                  by {article.author_name || 'Unknown User'}
                </span>
                <time dateTime={article.created_at}>
                  {new Date(article.created_at).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">まだ記事がありません</p>
            <WriteArticleButton
              text="最初の記事を書く"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            />
          </div>
        )}
      </div>
    </div>
  )
}