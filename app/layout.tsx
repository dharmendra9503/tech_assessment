import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { AuthProvider } from '@/providers/auth-provider'
import { ToastProvider } from '@/providers/toast-provider'
import { WalletProvider } from '@/providers/wallet-provider'
import { Footer } from '@/components/blocks/footer'
import { Navbar } from '@/components/navigation/navbar'
import { ThemeProvider } from '@/providers/theme-provider'

const themeBootstrapScript = `try {
  if (window.location.pathname === '/' && window.localStorage.getItem('blockestate-theme') === 'light') {
    document.documentElement.classList.remove('dark')
    document.documentElement.dataset.theme = 'light'
  }
} catch {}`

const geistSans = localFont({
  src: '../public/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: '../public/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: {
    default: 'BlockEstate — Premium real estate, tokenized for everyone',
    template: '%s | BlockEstate',
  },
  description:
    'Own a verified slice of premium real estate with crypto, starting from $100 — tokenized and fractional, settled on-chain.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-surface-base pt-[68px] text-foreground transition-colors duration-300`}
      >
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>
              <WalletProvider>
                <Navbar />
                {children}
                <Footer />
              </WalletProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
