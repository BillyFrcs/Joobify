import React from 'react';

import '../../styles/globals.css';

export const metadata = {
    title: 'Sign In | Joobify',
    description: 'Joobify Sign In Page',
}

export default function SignInLayout({ children }) {
    return (
        <html lang="en">
            <head></head>
            
            <body>
                {children}
            </body>
        </html>
    )
}