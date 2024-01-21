import React from 'react';

import '../../styles/globals.css';

export const metadata = {
    title: 'Dashboard | Joobify',
    description: 'Joobify User Dashboard Page',
}

export default function DashboardLayout({ children }) {
    return (
        <div>
            <main>
                {children}
            </main>
        </div>
    )
}