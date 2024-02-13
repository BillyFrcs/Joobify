'use client';

import Image from 'next/image';
import Link from 'next/link';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'flowbite-react';
import { getAuth } from 'firebase/auth';

import GoogleAuth from './googleAuth';
import firebaseApp from '@/config/firebaseApp';

import { WarningMessageSignIn } from '../layouts/warning';
import { joobifyEndpoint } from '@/utils/api';

const SignInForm = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        setEmail('');
        setPassword('');
    },[]);

    // Form data
    const [formData, setFormData] = useState({
        // Take from the input form
        email: email,
        password: password
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${joobifyEndpoint}/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Get the specific user data
            const result = await response.json();

            if (response.ok) {
                console.log(result.data.user.stsTokenManager.accessToken);

                setToken(result.data.user.stsTokenManager.accessToken);

                router.push('/');
            } else if (response.status === 500) {
                setError(result.message);

                setIsVisible(true);

                // Set the timeout
                setTimeout(() => {
                    setIsVisible(false);
                }, 5000);

                console.log(result.message);
            }
        } catch (error) {
            console.error('Error occurred: ', error);
        }
    };

    return (
        <main className='flex flex-col md:order-2 ml-9 pl-5 pt-20'>
            <h1 className="font-bold black-color text-4xl">WELCOME</h1>
            <h1 className="font-bold black-color text-4xl">TO <span className="main-color">JOOBIFY</span></h1>

            <form method='POST' onSubmit={handleSubmit} className="mt-6 grid grid-flow-row justify-start">
                <div className="mb-4">
                    <label htmlFor="email" className="black-color w-80 block mb-2 text-sm font-medium text-gray-900 dark:text-white light-font">Email address</label>
                    <input disabled type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required={true} />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="black-color w-80 block mb-2 text-sm font-medium text-gray-900 dark:text-white light-font">Your password</label>
                    <input disabled type="password" autoComplete="on" id="password" name="password" value={formData.password} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required={true} />
                </div>

                <WarningMessageSignIn />

                <Link className="forgot-password" href="/resetpassword">Forgot password?</Link>

                {isVisible && <span className='text-sm text-red-500 mt-2'>{error}</span>}

                <Button type="submit" className="joobify-main-color mt-3 btn-style light-font" pill>
                    Sign in
                </Button>

                <span className='mt-2 text-center black-color new-to-joobify light-font'>or</span>

                <GoogleAuth />

                <span className='mt-5 text-center black-color new-to-joobify'>New to Joobify? <Link href="/signup" className="main-color join-now font-bold">Join Now</Link></span>
            </form>

            <div className="flex justify-center absolute top-14 image-container max-w-full h-auto">
                <Image className="mt-10 auth-image" src="/images/signin.svg" width={0} height={0} priority={true} alt="Sign in image" />
            </div>
        </main>
    );
}

export default SignInForm;