import Link from 'next/link'
import AuthButton from '@/components/auth/AuthButton'
import WriteArticleButton from '@/components/layout/WriteArticleButton'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Tech Blog
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-gray-800">
            記事一覧
          </Link>
          <WriteArticleButton />
          <AuthButton />
        </nav>
      </div>
    </header>
  )
}