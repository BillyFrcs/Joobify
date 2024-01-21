import React from 'react';

import '../../styles/globals.css';

export const metadata = {
    title: 'Sign Up | Joobify',
    description: 'Joobify Sign Up Page',
}

export default function SignUpLayout({ children }) {
    return (
        <div>
            <main>
                {children}
            </main>
        </div>
    )
}