import type { Metadata } from 'next'
import { Lato, Montserrat } from 'next/font/google'
import Script from 'next/script'
import '../styles/globals.css'
import Spinner from '@/components/Spinner'
import Topbar from '@/components/Topbar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'

const lato = Lato({
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-lato',
})

const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Yimesgen Limousine Rent',
  description: 'Experience luxury, comfort, and exceptional service with our premium Limousine Rental.',
  keywords: 'limousine, car rental, luxury car, limo service',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
          rel="stylesheet"
        />
        <link
          href="/lib/animate/animate.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${lato.variable} ${montserrat.variable}`}>
        <Spinner />
        <Topbar />
        <Navbar />
        {children}
        <Footer />
        <BackToTop />
        
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}

