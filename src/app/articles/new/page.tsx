'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export default function NewArticle() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        alert('記事を作成するにはログインが必要です。')
        router.push('/')
        return
      }

      setUser(user)
      setLoading(false)
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session?.user) {
          // AuthButtonで「ログアウトしました」が表示されるため、ここではアラート不要
          router.push('/')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 text-center py-8">
        <p>認証確認中...</p>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      alert('タイトルと内容を入力してください')
      return
    }

    setIsSubmitting(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        alert('ログインが必要です')
        router.push('/')
        return
      }

      const { error } = await supabase
        .from('articles')
        .insert([
          {
            title: title.trim(),
            content: content.trim(),
            author_id: user.id,
            author_name: user.user_metadata?.name || user.email || 'Unknown User',
          },
        ])

      if (error) {
        console.error('Error creating article:', error)
        alert('記事の作成に失敗しました')
        return
      }

      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Error:', error)
      alert('記事の作成に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">新しい記事を書く</h1>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            タイトル
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            placeholder="記事のタイトルを入力してください"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            内容（Markdown）
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={15}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-xs sm:text-sm resize-y min-h-[300px]"
            placeholder="Markdown形式で記事の内容を入力してください"
            disabled={isSubmitting}
          />
          <p className="text-xs text-gray-500 mt-1">
            モバイルでの入力を考慮して、テキストエリアは縦方向にリサイズ可能です
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {isSubmitting ? '投稿中...' : '記事を投稿'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full sm:w-auto px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm sm:text-base"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  )
}