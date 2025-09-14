This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Legal Pages

This project includes privacy policy and terms of service pages to ensure compliance with legal requirements.

### Why Privacy Policy and Terms of Service are Needed

For any web application that collects user data or provides services, having proper legal pages is essential:

- **Privacy Policy**: Required by laws like GDPR, CCPA, and other privacy regulations when collecting personal information
- **Terms of Service**: Establishes the rules and guidelines for using your service, protecting both users and the service provider
- **User Trust**: Professional legal pages build user confidence and trust in your platform
- **Platform Requirements**: Many hosting platforms, authentication providers, and third-party services require these pages

### Implementation Steps

#### 1. Create Privacy Policy Page

Create `src/app/privacy/page.tsx`:

```tsx
import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="prose prose-lg mx-auto">
        <h1 className="text-3xl font-bold mb-8">プライバシーポリシー</h1>

        {/* Add disclaimer for test sites */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <p className="text-sm text-yellow-800">
            <strong>注意：</strong>これはテスト用のサイトです。実際のサービス運用時には法律専門家にご相談ください。
          </p>
        </div>

        {/* Add your privacy policy content here */}

        {/* Navigation back to home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
```

#### 2. Create Terms of Service Page

Create `src/app/terms/page.tsx`:

```tsx
import Link from 'next/link'

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="prose prose-lg mx-auto">
        <h1 className="text-3xl font-bold mb-8">利用規約</h1>

        {/* Add disclaimer for test sites */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <p className="text-sm text-yellow-800">
            <strong>注意：</strong>これはテスト用のサイトです。実際のサービス運用時には法律専門家にご相談ください。
          </p>
        </div>

        {/* Add your terms of service content here */}

        {/* Navigation back to home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
```

#### 3. Add Links in Footer or Navigation

Add links to these pages in your main layout or footer:

```tsx
<footer className="bg-gray-800 text-white py-8">
  <div className="max-w-4xl mx-auto px-4 text-center">
    <div className="flex justify-center space-x-6">
      <Link href="/privacy" className="hover:text-blue-300">
        プライバシーポリシー
      </Link>
      <Link href="/terms" className="hover:text-blue-300">
        利用規約
      </Link>
    </div>
  </div>
</footer>
```

### Important Notes

- **Legal Disclaimer**: Always include a disclaimer for test/development sites
- **Professional Review**: For production applications, have legal professionals review your policies
- **Regular Updates**: Keep policies updated as your service evolves
- **Clear Language**: Write policies in clear, understandable language for your users
- **Accessibility**: Ensure pages are accessible and properly styled
- **Mobile Responsive**: Test that pages work well on all device sizes

### Styling Considerations

- Use Tailwind's `prose` class for readable text formatting
- Add proper spacing and typography hierarchy
- Include visual indicators for important sections (like warnings)
- Ensure buttons have proper contrast and hover states
- Test the pages in both light and dark themes if applicable

# Updated home button styles
