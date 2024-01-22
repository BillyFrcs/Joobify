import React from 'react';

import '../../styles/globals.css';

export const metadata = {
    title: 'Reset Password | Joobify',
    description: 'Joobify Reset Password Page',
}

export default function ProfileLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    )
}
