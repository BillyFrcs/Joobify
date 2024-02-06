import React from 'react';

import '../../../styles/globals.css';

export const metadata = {
    title: 'Post Job | Joobify',
    description: 'Joobify Post Job Page',
}

export default function PostJobLayout({ children }) {
    return (
        <div>
            {children}
        </div>
    )
}
