import React from 'react';

import '../../styles/globals.css';

export const metadata = {
    title: 'View Job | Joobify',
    description: 'Joobify View Job Page',
}

export default function ViewJobLayout({ children }) {
    return (
        <div>
            {children}
        </div>
    )
}
