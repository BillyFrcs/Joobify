
import React from 'react';

import '../../../styles/globals.css';

export const metadata = {
    title: 'Job Detail | Joobify',
    description: 'Joobify Job Detail Page',
}

export default function JobDetailLayout({ children }) {
    return (
        <div>
            {children}
        </div>
    )
}
