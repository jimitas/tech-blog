import Link from 'next/link'
import AuthButton from '@/components/auth/AuthButton'
import WriteArticleButton from '@/components/layout/WriteArticleButton'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* モバイル: 縦並び、デスクトップ: 横並び */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-gray-800">
            Tech Blog
          </Link>

          {/* ナビゲーション */}
          <nav className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
            <Link href="/" className="text-gray-600 hover:text-gray-800 text-sm sm:text-base">
              記事一覧
            </Link>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
              <WriteArticleButton />
              <AuthButton />
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}