'use client'

import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface WriteArticleButtonProps {
  text?: string
  className?: string
}

export default function WriteArticleButton({
  text = "記事を書く",
  className = "text-gray-600 hover:text-gray-800 cursor-pointer"
}: WriteArticleButtonProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

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

  const handleClick = () => {
    if (!user) {
      alert('記事を書くにはログインが必要です。')
      return
    }
    router.push('/articles/new')
  }

  if (loading) {
    return (
      <div className="w-20 h-10 bg-gray-200 animate-pulse rounded"></div>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {text}
    </button>
  )
}