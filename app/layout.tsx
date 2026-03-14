import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kalkulator HPP Bisnis',
  description: 'Aplikasi kalkulator HPP untuk berbagai mode bisnis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
