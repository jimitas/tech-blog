'use client'

import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import ConsentModal from './ConsentModal'

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showConsentModal, setShowConsentModal] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const newUser = session?.user ?? null
        const prevUser = user

        setUser(newUser)

        // ログイン成功の通知
        if (event === 'SIGNED_IN' && newUser) {
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
  }, [user])

  const handleSignInClick = () => {
    setShowConsentModal(true)
  }

  const handleConsentAccept = async () => {
    setShowConsentModal(false)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}`
      }
    })
  }

  const handleConsentCancel = () => {
    setShowConsentModal(false)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return <div className="w-20 h-10 bg-gray-200 animate-pulse rounded"></div>
  }

  return (
    <>
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

      <ConsentModal
        isOpen={showConsentModal}
        onAccept={handleConsentAccept}
        onCancel={handleConsentCancel}
      />
    </>
  )
}