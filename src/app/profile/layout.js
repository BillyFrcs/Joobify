import React from 'react';

import '../../styles/globals.css';

export const metadata = {
    title: 'Profile | Joobify',
    description: 'Joobify User Profile Page',
}

export default function ProfileLayout({ children }) {
    return (
        <html lang="en">
            <head></head>

            <body>
                {children}
            </body>
        </html>
    )
}
