import Link from 'next/link'

import { Button } from 'flowbite-react';

export const metadata = {
    title: '404 - Not Found | Joobify',
    description: 'Joobify 404 - Not Found Page'
}

function NotFound() {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <iframe
                src="https://giphy.com/embed/l2JehQ2GitHGdVG9y"
                width="480"
                height="362"
                frameBorder="0"
                allowFullScreen
            ></iframe>

            <h1 className='mt-5 text-4xl font-bold'>404 - Not Found</h1>
            <p className='text-xl'>The page you are looking for does not exist.</p>

            <Link className='mt-5' href="/">
                <Button className='btn-style light-font' color='failure'>Go Home</Button>
            </Link>
        </div>
    );
}

export default NotFound;