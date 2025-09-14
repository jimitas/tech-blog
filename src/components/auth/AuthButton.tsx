'use client'

import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

// LINE内蔵ブラウザを検知する関数
const isLineInAppBrowser = () => {
  if (typeof window === 'undefined') return false
  const userAgent = window.navigator.userAgent.toLowerCase()
  return userAgent.includes('line')
}

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [showLineWarning, setShowLineWarning] = useState(false)

  useEffect(() => {
    setShowLineWarning(isLineInAppBrowser())
  }, [])

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
      setIsInitialLoad(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const newUser = session?.user ?? null
        const prevUser = user

        setUser(newUser)

        // 初回ロード中は通知しない（セッション復元時のアラートを防ぐ）
        if (isInitialLoad) return

        // ログイン成功の通知（実際に未ログイン状態からログインした場合のみ）
        if (event === 'SIGNED_IN' && newUser && !prevUser) {
          const userName = newUser.user_metadata?.name || newUser.email || 'ユーザー'
          alert(`${userName}としてログインしました。`)
        }

        // ログアウト成功の通知
        if (event === 'SIGNED_OUT' && prevUser) {
          alert('ログアウトしました。')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [user, isInitialLoad])

  const handleSignInClick = async () => {
    // LINE内蔵ブラウザの場合は外部ブラウザで開くよう案内
    if (isLineInAppBrowser()) {
      const message = `LINEアプリ内でのログインに問題が発生する可能性があります。\n\n右上の「...」メニューから「他のアプリで開く」または「Safari/Chromeで開く」を選択してください。\n\nそれでもログインできない場合は、このURLをコピーしてブラウザで開いてください：\n${window.location.href}`

      alert(message)

      // それでも続行する場合のために認証処理も実行
      try {
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}`
          }
        })
      } catch (error) {
        console.error('Authentication error:', error)
      }
      return
    }

    // 通常のブラウザでの認証処理
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}`
      }
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return <div className="w-20 h-10 bg-gray-200 animate-pulse rounded"></div>
  }

  return (
    <>
      {/* LINE内蔵ブラウザ警告バナー */}
      {showLineWarning && !user && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-yellow-800">LINEアプリをご利用中の方へ</h3>
              <p className="text-sm text-yellow-700 mt-1">
                ログインが正常に動作しない場合は、右上の「︙」メニューから「他のアプリで開く」を選択してください。
              </p>
            </div>
            <button
              onClick={() => setShowLineWarning(false)}
              className="text-yellow-600 hover:text-yellow-800"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-700">
              {user.user_metadata?.name || user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              ログアウト
            </button>
          </>
        ) : (
          <button
            onClick={handleSignInClick}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Googleでログイン
          </button>
        )}
      </div>
    </>
  )
}