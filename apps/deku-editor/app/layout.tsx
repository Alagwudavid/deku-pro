import './globals.css'

export const metadata = {
  title: 'Portfolio Builder',
  description: 'Create stunning portfolios easily!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen w-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
        {children}
      </body>
    </html>
  )
}
