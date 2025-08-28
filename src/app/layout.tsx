import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { StripeProvider } from '@/components/providers/StripeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ResultRx - Understand Your Lab Results with AI',
  description: 'Get clear, plain-language explanations of your medical lab results using Google Gemini AI. Track trends, ask questions, and take control of your health.',
  keywords: 'lab results, medical tests, health, AI, Gemini, medical explanation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <StripeProvider>
            {children}
          </StripeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
