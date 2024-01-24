import React from 'react';

// import { Inter } from 'next/font/google'

import '../styles/globals.css';

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Home | Joobify',
  description: 'Joobify Home Page'
}

export default function RootLayout({ children }) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <html lang="en" suppressHydrationWarning={isDevelopment}>
      <head>
        <link rel="icon" href="/images/JoobifyFavicon.svg" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body suppressHydrationWarning={isDevelopment}>
        {children}
      </body>
    </html>
  )
}