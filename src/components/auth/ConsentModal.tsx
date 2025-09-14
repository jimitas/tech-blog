'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ConsentModalProps {
  isOpen: boolean
  onAccept: () => void
  onCancel: () => void
}

export default function ConsentModal({ isOpen, onAccept, onCancel }: ConsentModalProps) {
  const [privacyChecked, setPrivacyChecked] = useState(false)
  const [termsChecked, setTermsChecked] = useState(false)

  if (!isOpen) return null

  const canProceed = privacyChecked && termsChecked

  const handleAccept = () => {
    if (canProceed) {
      onAccept()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-lg font-semibold mb-4">利用規約・プライバシーポリシーの同意</h2>

        <div className="mb-6">
          <p className="text-sm text-gray-700 mb-4">
            「Googleでログイン」を行う前に、以下の内容にご同意ください。
          </p>

          <div className="space-y-3">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={privacyChecked}
                onChange={(e) => setPrivacyChecked(e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">
                <Link
                  href="/privacy"
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  プライバシーポリシー
                </Link>
                に同意する
              </span>
            </label>

            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={termsChecked}
                onChange={(e) => setTermsChecked(e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">
                <Link
                  href="/terms"
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  利用規約
                </Link>
                に同意する
              </span>
            </label>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
          <p className="text-xs text-yellow-800">
            <strong>テスト用サイト:</strong> このサイトはテスト目的で運営されています。個人情報の取り扱いにご注意ください。
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
          >
            キャンセル
          </button>
          <button
            onClick={handleAccept}
            disabled={!canProceed}
            className={`flex-1 px-4 py-2 rounded text-white font-medium ${
              canProceed
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            同意してログイン
          </button>
        </div>
      </div>
    </div>
  )
}