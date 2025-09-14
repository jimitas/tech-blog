'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface DeleteButtonProps {
  articleId: string
  authorId: string
}

export default function DeleteButton({ articleId, authorId }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    // 二重確認のアラート
    if (!confirm('本当にこの記事を削除しますか？\nこの操作は取り消せません。')) {
      setShowConfirm(false)
      return
    }

    setIsDeleting(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user || user.id !== authorId) {
        alert('削除権限がありません')
        return
      }

      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', articleId)
        .eq('author_id', user.id)

      if (error) {
        console.error('Error deleting article:', error)
        alert('記事の削除に失敗しました')
        return
      }

      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Error:', error)
      alert('記事の削除に失敗しました')
    } finally {
      setIsDeleting(false)
      setShowConfirm(false)
    }
  }

  if (showConfirm) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800 mb-3 text-sm">⚠️ この記事を削除しますか？</p>
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isDeleting ? '削除中...' : '削除する'}
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            disabled={isDeleting}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            キャンセル
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
    >
      削除
    </button>
  )
}