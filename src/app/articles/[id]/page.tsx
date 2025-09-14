import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import ArticleActions from '@/components/articles/ArticleActions'

interface ArticlePageProps {
  params: {
    id: string
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!article) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto px-4">
      <div className="mb-6 sm:mb-8">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block text-sm sm:text-base"
        >
          ← 記事一覧に戻る
        </Link>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {article.title}
        </h1>

        {/* メタ情報 - モバイルでは縦並び */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8">
          <span>
            by {article.author_name || 'Unknown User'}
          </span>
          <span className="hidden sm:block">•</span>
          <time dateTime={article.created_at}>
            {new Date(article.created_at).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </time>
          {article.updated_at !== article.created_at && (
            <>
              <span className="hidden sm:block">•</span>
              <span className="text-xs sm:text-sm">
                更新: {new Date(article.updated_at).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </>
          )}
        </div>

        <ArticleActions articleId={article.id} authorId={article.author_id} />
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 lg:p-8">
        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </div>
    </article>
  )
}