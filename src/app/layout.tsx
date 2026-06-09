import '@/styles/globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Toaster } from 'sonner'
import { ReactNode } from 'react'
import { Montserrat } from 'next/font/google'
import { Metadata } from 'next'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: '503 | Forbidden',
  description: 'Forbidden',
  icons: {
    icon: [
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script src="https://kit.fontawesome.com/2ff8362c80.js" crossOrigin="anonymous"></script>
        <script dangerouslySetInnerHTML={{
          __html: `(function() {
            if (localStorage.getItem("darkmode") === "active") {
              document.documentElement.classList.add("darkmode");
            }
          })();`
        }} />
      </head>
      <body className={`${montserrat.className} body-color`}>
        <Toaster richColors position="top-center" />
        {children}
      </body>
    </html>
  )
}