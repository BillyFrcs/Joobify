import React from 'react';

// import { Inter } from 'next/font/google'

import '../styles/globals.css';

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Home | Joobify',
  description: 'Joobify Home Page',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/JoobifyFavicon.svg',
        href: '/images/JoobifyFavicon.svg'
      }
    ]
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/JoobifyFavicon.svg" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body className="">
        {children}
      </body>
    </html>
  )
}
