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
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          ← 記事一覧に戻る
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-8">
          <span>
            by {article.author_name || 'Unknown User'}
          </span>
          <span>•</span>
          <time dateTime={article.created_at}>
            {new Date(article.created_at).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </time>
          {article.updated_at !== article.created_at && (
            <>
              <span>•</span>
              <span>
                更新: {new Date(article.updated_at).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </>
          )}
        </div>

        <ArticleActions articleId={article.id} authorId={article.author_id} />
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-8">
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </div>
    </article>
  )
}