import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import SupabseProvider from '@/providers/SupabaseProvide'
import UserProvider from '@/providers/UserProvider'
import ModelProvider from '@/providers/ModelProvider'
import ToasterProvider from '@/providers/ToastProvider'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Listen to music!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
        <SupabseProvider>
          <UserProvider>
            <ModelProvider/>
          <Sidebar>
            {children}
          </Sidebar>
          </UserProvider>
        </SupabseProvider>
      </body>
    </html>
  )
}
