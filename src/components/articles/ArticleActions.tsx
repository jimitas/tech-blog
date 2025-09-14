'use client'

import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import DeleteButton from './DeleteButton'

interface ArticleActionsProps {
  articleId: string
  authorId: string
}

export default function ArticleActions({ articleId, authorId }: ArticleActionsProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return null
  }

  // ログインしていない、または作者でない場合は何も表示しない
  if (!user || user.id !== authorId) {
    return null
  }

  return (
    <div className="flex gap-4 mb-8">
      <DeleteButton articleId={articleId} authorId={authorId} />
    </div>
  )
}