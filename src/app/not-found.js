import Link from 'next/link'

import { Button } from 'flowbite-react';

export const metadata = {
    title: '404 - Not Found | Joobify',
    description: 'Joobify 404 - Not Found Page'
}

function NotFound() {
    return (
        <div>
            <h1>404 - That page does not seem to exist...</h1>

            <Button className='btn-style light-font' color='failure'>
                <Link href="/">Go Home</Link>
            </Button>
        </div>
    );
}

export default NotFound;