import React from 'react';

import '../../styles/globals.css';

export const metadata = {
    title: 'Reset Password | Joobify',
    description: 'Joobify Reset Password Page',
}

export default function ResetPasswordLayout({ children }) {
    return (
        <html lang="en">
            <head></head>

            <body>
                {children}
            </body>
        </html>
    )
}
