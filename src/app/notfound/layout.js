import React from 'react';

import '../../styles/globals.css';

export const metadata = {
    title: '404 - Not Found | Joobify',
    description: 'Joobify 404 - Not Found Page'
}

export default function NotFoundLayout({ children }) {
    return (
        <div>
            {children}
        </div>
    )
}
